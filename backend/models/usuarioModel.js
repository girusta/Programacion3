const db = require('../database');

const usuarioModel = {
  // Función para verificar las credenciales del usuario
  verificarCredenciales: async (usuario, password) => {
    try {
      // Realizar la consulta a la base de datos para verificar las credenciales
      const [rows, fields] = await db.query('SELECT * FROM usuario WHERE usuario = ? AND password = ?', [usuario, password]);

      // Verificar si se encontraron resultados
      if (rows.length > 0) {
        // Credenciales válidas
        return true;
      } else {
        // Credenciales incorrectas
        return false;
      }
    } catch (error) {
      // Manejar errores de la base de datos
      console.error('Error al verificar las credenciales:', error);
      throw error;
    }
  },

  // Obtener todas las marcas
  getUsuarios: async () => {
    try {
      const query = 'SELECT * FROM usuario';
      const [usuarios] = await db.query(query);
      return usuarios;
    } catch (err) {
      throw err;
    }
  },

  // Obtener un usuario por su ID
  getUsuarioById: async (id) => {
    try {
      const query = 'SELECT * FROM usuario WHERE idusuario = ?';
      const [usuario] = await db.query(query, [id]);
      return usuario[0];
    } catch (err) {
      throw err;
    }
  }
};

module.exports = usuarioModel;
