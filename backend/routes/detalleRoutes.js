// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const detalleordenservicioController = require('../controllers/detalleordenservicioController');

// // Rutas CRUD

router.get('/:idorden', detalleordenservicioController.getAllDetalles);

// Crear  (POST)
router.post('/', detalleordenservicioController.createDetalle);

// Obtener su ID (GET)
router.get('/:id', detalleordenservicioController.getDetalleById);

// eliminar delete
router.delete('/:id', detalleordenservicioController.deleteDetalle);

// actualizar
router.put('/:id', detalleordenservicioController.updateDetalle);

module.exports = router;