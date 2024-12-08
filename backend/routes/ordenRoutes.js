const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

// // Rutas CRUD para la tabla cliente

router.get('/', ordenController.getAllOrdenes);

// Crear  (POST)
router.post('/', ordenController.createOrden);

// Obtener por ID (GET)
router.get('/:id', ordenController.getOrdenById);

// eliminar delete
router.delete('/:id', ordenController.deleteOrden);

// actualizar
router.put('/:id', ordenController.updateOrden);

module.exports = router;