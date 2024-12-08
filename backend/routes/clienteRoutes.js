// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// // Rutas CRUD para la tabla cliente

router.get('/', clienteController.getAllClientes);

// Crear un nuevo usuario (POST)
router.post('/', clienteController.createCliente);

// Obtener un solo usuario por su ID (GET)
router.get('/:id', clienteController.getClienteById);

// eliminar delete
router.delete('/:id', clienteController.deleteCliente);

// actualizar
router.put('/:id', clienteController.updateCliente);

module.exports = router;