
const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

// // Rutas CRUD para la tabla cliente

router.get('/', vehiculoController.getVehiculosDetallados);

// Crear  (POST)
router.post('/', vehiculoController.createVehiculo);

// Obtener por ID (GET)
router.get('/:id', vehiculoController.getVehiculoDetalladoById);

// eliminar delete
router.delete('/:id', vehiculoController.deleteVehiculo);

// actualizar
router.put('/:id', vehiculoController.updateVehiculo);

module.exports = router;