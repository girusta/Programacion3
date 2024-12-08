/* Modelo - Base de datos */
const db = require('../database');

// get

const getAllDetalles = async (idorden) => {
  try {
    const [rows] = await db.query('SELECT * FROM detalle_orden_servicio where idorden = ? order by iddetalle desc', [idorden]);
    return rows;
  } catch (err) {
    throw err;
  }
};

// get x id
const getDetalleById = async (detalleId) => {
    try {
      const query = 'SELECT * FROM detalle_orden_servicio WHERE iddetalle = ?';
      const [rows] = await db.query(query, [detalleId]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };
  const getDetalleByOrdenId = async (ordenId) => {
    try {
      const query = 'SELECT * FROM detalle_orden_servicio WHERE idorden = ?';
      const [rows] = await db.query(query, [ordenId]);
      return rows;
    } catch (err) {
      throw err;
    }
  };

   // post

   const createDetalle = async (idorden, idservicio) => {
    try {
      const query = 'INSERT INTO detalle_orden_servicio (idorden, idservicio) VALUES (?, ?)';
      await db.query(query, [idorden, idservicio]);
    } catch (err) {
      throw err;
    }
  };

   //actualizar put

   const updateDetalle = async (iddetalle, idorden, idservicio) => {
    try {
      const query = 'UPDATE detalle_orden_servicio SET idorden=?, idservicio=? WHERE iddetalle=?';
      await db.query(query, [idorden, idservicio, iddetalle]);
    } catch (err) {
      throw err;
    }
  };

    //delete
const deleteDetalle = async (id) => {
    try {
     const query = 'DELETE FROM detalle_orden_servicio WHERE iddetalle = ?';
     await db.query(query, [id]);
   } catch (err) {
     throw err;
   }  
 
 };
     //delete by orden
const deleteDetalleBayOrden = async (idorden) => {
  try {
   const query = 'DELETE FROM detalle_orden_servicio WHERE idorden = ?';
   await db.query(query, [idorden]);
 } catch (err) {
   throw err;
 }  

};
 module.exports = {
   getAllDetalles,
   createDetalle,
   getDetalleById,
   getDetalleByOrdenId,
   deleteDetalle,
   updateDetalle,
   deleteDetalleBayOrden
 };
 