const express = require('express');
const router = express.Router();
const tipoVehController = require('../controllers/tipovehiculoController');

// Definir rutas
router.get('/', tipoVehController.getAllTipoVeh);
router.get('/:id', tipoVehController.getTipoVehById);

module.exports = router;