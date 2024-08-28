const Alerta = require('../models/Alerta');
const Proyecto = require('../models/Proyecto');
const { Op } = require('sequelize');

module.exports = {
    // Obtener todas las alertas (proyectos próximos a vencer)
    getAll: async (req, res) => {
        try {
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);

            const proyectos = await Proyecto.findAll({
                where: {
                    fechaFin: {
                        [Op.between]: [today, nextWeek]
                    }
                },
                attributes: ['id', 'nombre', 'fechaFin']
            });

            if (proyectos.length === 0) {
                return res.status(200).json({ message: 'No hay proyectos próximos a vencer.' });
            }

            // Guardar los proyectos como alertas en la tabla `Alertas`
            const alertas = await Promise.all(proyectos.map(async (proyecto) => {
                const [alerta, created] = await Alerta.findOrCreate({
                    where: { nombre: proyecto.nombre, fechaFin: proyecto.fechaFin },
                    defaults: { nombre: proyecto.nombre, fechaFin: proyecto.fechaFin }
                });
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
                fechaFin: req.body.fechaFin
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
