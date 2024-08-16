const Proyecto = require('../models/Proyecto');

module.exports = {
    getAll: async (req, res) => {
        try {
            const proyectos = await Proyecto.findAll();
            res.json(proyectos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const proyecto = await Proyecto.findByPk(req.params.id);
            if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
            res.json(proyecto);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const nuevoProyecto = await Proyecto.create(req.body);
            res.status(201).json(nuevoProyecto);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const proyecto = await Proyecto.findByPk(req.params.id);
            if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
            await proyecto.update(req.body);
            res.json(proyecto);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
