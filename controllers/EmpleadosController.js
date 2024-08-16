const Empleado = require('../models/Empleado');
const Proyecto = require('../models/Proyecto');

module.exports = {
    getAll: async (req, res) => {
        try {
            const empleados = await Empleado.findAll({
                include: {
                    model: Proyecto,
                    attributes: ['nombre']
                }
            });
            res.json(empleados);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const empleado = await Empleado.findByPk(req.params.id, {
                include: {
                    model: Proyecto,
                    attributes: ['nombre']
                }
            });
            if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
            res.json(empleado);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const nuevoEmpleado = await Empleado.create(req.body);
            res.status(201).json(nuevoEmpleado);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const empleado = await Empleado.findByPk(req.params.id);
            if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
            await empleado.update(req.body);
            res.json(empleado);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const empleado = await Empleado.findByPk(req.params.id);
            if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
            await empleado.destroy();
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
