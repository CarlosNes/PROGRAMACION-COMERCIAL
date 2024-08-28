const Alerta = require('../models/Alerta');
const Proyecto = require('../models/Proyecto');
const { Op } = require('sequelize');

module.exports = {
    // Obtener todos los proyectos
    getAll: async (req, res) => {
        try {
            const proyectos = await Proyecto.findAll({
                attributes: ['id', 'nombre', 'descripcion', 'fechaInicio', 'fechaFin', 'porcentajeCompletado']
            });
            res.json(proyectos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obtener un proyecto por ID
    getById: async (req, res) => {
        try {
            const proyecto = await Proyecto.findByPk(req.params.id, {
                attributes: ['id', 'nombre', 'descripcion', 'fechaInicio', 'fechaFin', 'porcentajeCompletado']
            });
            if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
            res.json(proyecto);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Crear un nuevo proyecto
    create: async (req, res) => {
        try {
            const nuevoProyecto = await Proyecto.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                fechaInicio: req.body.fechaInicio,
                fechaFin: req.body.fechaFin,
                porcentajeCompletado: req.body.porcentajeCompletado
            });
            res.status(201).json(nuevoProyecto);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Actualizar un proyecto existente
    update: async (req, res) => {
        try {
            const proyecto = await Proyecto.findByPk(req.params.id);
            if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
            await proyecto.update(req.body);
            res.json(proyecto);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Eliminar un proyecto
    delete: async (req, res) => {
        try {
            const proyecto = await Proyecto.findByPk(req.params.id);
            if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
            await proyecto.destroy();
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};