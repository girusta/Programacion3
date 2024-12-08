const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

// Definir rutas
router.get('/', estadoController.getAllEstados);
router.get('/:id', estadoController.getEstadoById);

module.exports = router;