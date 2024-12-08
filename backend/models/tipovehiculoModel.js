/* Modelo - Base de datos */
const db = require('../database');

// Ejemplo de método para obtener todos los usuarios desde la base de datos
const getAllTipoVeh = async () => {
    try {
      const [rows] = await db.query('SELECT * FROM tipovehiculo order by idtipovehiculo desc');
      return rows;
    } catch (err) {
      throw err;
    }
  };

  const getTipoVehById = async (TipoVehId) => {
    try {
      const query = 'SELECT * FROM tipovehiculo WHERE idtipovehiculo = ?';
      const [rows] = await db.query(query, [TipoVehId]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };



  module.exports = {
    getAllTipoVeh,
    getTipoVehById
  };