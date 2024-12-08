const db = require('../database');

// get
const getAllFormaPago = async () => {
    try {
      const [rows] = await db.query('SELECT * FROM forma_pago order by id_forma_pago desc');
      return rows;
    } catch (err) {
      throw err;
    }
  };

  // get id
  const getFormaPagoById = async (formapagoId) => {
    try {
      const query = 'SELECT * FROM forma_pago WHERE id_forma_pago = ?';
      const [rows] = await db.query(query, [formapagoId]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

  module.exports = {
    getAllFormaPago,
    getFormaPagoById
  };