const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');

// // Rutas CRUD para la tabla cliente

router.get('/', marcaController.getMarcas);

// Crear  (POST)
router.post('/', marcaController.createMarca);

// Obtener por ID (GET)
router.get('/:id', marcaController.getMarcaById);

// eliminar delete
router.delete('/:id', marcaController.deleteMarca);

// actualizar
router.put('/:id', marcaController.updateMarca);

module.exports = router;