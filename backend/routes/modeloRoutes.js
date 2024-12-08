const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');

// // Rutas CRUD para la tabla cliente

router.get('/', modeloController.getModelsView);

// Crear  (POST)
router.post('/', modeloController.createModelo);

// Obtener por ID (GET)
router.get('/:id', modeloController.getModeloById);

// eliminar delete
router.delete('/:id', modeloController.deleteModelo);

// actualizar
router.put('/:id', modeloController.updateModelo);

module.exports = router;