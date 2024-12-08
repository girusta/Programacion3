const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

// // Rutas CRUD 

router.get('/', servicioController.getAllServicios);

// Crear  (POST)
router.post('/', servicioController.createServicio);

// Obtener por ID (GET)
router.get('/:id', servicioController.getServicioById);

// eliminar delete
router.delete('/:id', servicioController.deleteServicio);

// actualizar
router.put('/:id', servicioController.updateServicio);



module.exports = router;