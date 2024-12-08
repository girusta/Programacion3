const express = require('express');
const router = express.Router();
const localidadController = require('../controllers/localidadController');

// Definir rutas
router.get('/', localidadController.getAllLocalidades);
router.get('/:id', localidadController.getLocalidadById);

module.exports = router;