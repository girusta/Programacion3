const db = require('../database');

// Ejemplo de método para obtener todos los usuarios desde la base de datos
const getAllLocalidades = async () => {
    try {
      const [rows] = await db.query('SELECT * FROM localidad order by idlocalidad desc');
      return rows;
    } catch (err) {
      throw err;
    }
  };

  const getLocalidadById = async (localidadId) => {
    try {
      const query = 'SELECT * FROM localidad WHERE idlocalidad = ?';
      const [rows] = await db.query(query, [localidadId]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

  module.exports = {
    getAllLocalidades,
    getLocalidadById
  };