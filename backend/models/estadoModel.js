const db = require('../database');

// get
const getAllEstados = async () => {
    try {
      const [rows] = await db.query('SELECT * FROM estado order by idestado desc');
      return rows;
    } catch (err) {
      throw err;
    }
  };

  // get id
  const getEstadoById = async (estadoId) => {
    try {
      const query = 'SELECT * FROM estado WHERE idestado = ?';
      const [rows] = await db.query(query, [estadoId]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

  module.exports = {
    getAllEstados,
    getEstadoById
  };