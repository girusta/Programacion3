const express = require('express');
const router = express.Router();
const formadepagoController = require('../controllers/formadepagoController');

// Definir rutas
router.get('/', formadepagoController.getAllFormaPago);
router.get('/:id', formadepagoController.getFormaPagoById);

module.exports = router;