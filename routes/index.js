const { Router } = require('express');
const EmpleadosController = require('../controllers/EmpleadosController');
const ProyectosController = require('../controllers/ProyectosController');
const AlertasController = require('../controllers/AlertasController'); // Asegúrate de que esta línea esté presente

const router = Router();

// Rutas para empleados
router.get('/empleados', EmpleadosController.getAll);
router.get('/empleados/:id', EmpleadosController.getById);
router.post('/empleados', EmpleadosController.create);
router.put('/empleados/:id', EmpleadosController.update);
router.delete('/empleados/:id', EmpleadosController.delete);

// Rutas para proyectos
router.get('/proyectos', ProyectosController.getAll);
router.get('/proyectos/:id', ProyectosController.getById);
router.post('/proyectos', ProyectosController.create);
router.put('/proyectos/:id', ProyectosController.update);
router.delete('/proyectos/:id', ProyectosController.delete);

// Rutas para alertas
router.get('/alertas', AlertasController.getAll);
router.get('/alertas/:id', AlertasController.getById);
router.post('/alertas', AlertasController.create);
router.put('/alertas/:id', AlertasController.update);
router.delete('/alertas/:id', AlertasController.delete);

module.exports = (app) => {
    app.use('/', router);
};
