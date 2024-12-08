const usuarioModel = require('../models/usuarioModel');

const usuarioController = {
  // Función para manejar el inicio de sesión
  iniciarSesion: async (req, res) => {
    try {
      const { usuario, password } = req.body;

      // Verificar las credenciales utilizando el modelo
      const credencialesValidas = await usuarioModel.verificarCredenciales(usuario, password);

      if (credencialesValidas) {
        // Credenciales válidas, se puede redirigir o enviar una respuesta
        res.json({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
        // Credenciales incorrectas
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      // Manejar errores generales
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  },

  // Obtener todos los usuarios
  getUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioModel.getUsuarios();
      res.status(200).json({ usuarios });
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Obtener un usuario por su ID
  getUsuarioById: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await usuarioModel.getUsuarioById(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json({ usuario });
    } catch (err) {
      console.error('Error al obtener el usuario por ID:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

module.exports = usuarioController;
