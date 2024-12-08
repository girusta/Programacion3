// routes/usuarioRoutes.js
const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

// Ruta para el inicio de sesión
router.post('/iniciar-sesion', usuarioController.iniciarSesion);


// // Rutas CRUD para la tabla cliente

router.get('/', usuarioController.getUsuarios);

// Obtener por ID (GET)
router.get('/:id', usuarioController.getUsuarioById);


module.exports = router;

