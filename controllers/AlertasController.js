const Alerta = require('../models/Alerta');
const Proyecto = require('../models/Proyecto');
const { Op } = require('sequelize');

module.exports = {
    // Obtener todas las alertas (proyectos próximos a vencer o válidos)
    getAll: async (req, res) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 

            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);

            const proyectos = await Proyecto.findAll({
                attributes: ['id', 'nombre', 'fechaFin']
            });

            const alertas = await Promise.all(proyectos.map(async (proyecto) => {
                let descripcion;

                const fechaFin = new Date(proyecto.fechaFin);
                fechaFin.setHours(0, 0, 0, 0);

                if (fechaFin >= today && fechaFin <= nextWeek) {
                    descripcion = 'Proximo a vencer';
                } else {
                    descripcion = 'Producto valido';
                }

                const [alerta, created] = await Alerta.findOrCreate({
                    where: { nombre: proyecto.nombre, fechaFin: proyecto.fechaFin },
                    defaults: { descripcion }
                });

                if (!created && alerta.descripcion !== descripcion) {
                    alerta.descripcion = descripcion;
                    await alerta.save();
                }

                return alerta;
            }));

            res.json(alertas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obtener una alerta específica por ID
    getById: async (req, res) => {
        try {
            const alerta = await Alerta.findByPk(req.params.id);
            if (!alerta) return res.status(404).json({ error: 'Alerta no encontrada' });

            res.json(alerta);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Crear una nueva alerta manualmente
    create: async (req, res) => {
        try {
            const nuevaAlerta = await Alerta.create({
                nombre: req.body.nombre,
                fechaFin: req.body.fechaFin,
                descripcion: req.body.descripcion 
            });
            res.status(201).json(nuevaAlerta);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Actualizar una alerta existente
    update: async (req, res) => {
        try {
            const alerta = await Alerta.findByPk(req.params.id);
            if (!alerta) return res.status(404).json({ error: 'Alerta no encontrada' });

            await alerta.update(req.body);
            res.json(alerta);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Eliminar una alerta
    delete: async (req, res) => {
        try {
            const alerta = await Alerta.findByPk(req.params.id);
            if (!alerta) return res.status(404).json({ error: 'Alerta no encontrada' });

            await alerta.destroy();
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
