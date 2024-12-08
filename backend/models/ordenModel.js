/* Modelo - Base de datos */
const db = require('../database');
const detalleordenservicioModel = require('./detalleordenservicioModel');

// get

const getAllOrdenes = async () => {
  try {
    const [rows] = await db.query(
      "SELECT o.idorden, o.fecha_carga, c.nombre AS nombre, v.dominio, o.fecha_turno, o.horario_turno, o.monto_total, fp.nombre AS forma_pago, e.nombre AS estado, u.idusuario " +
      "FROM orden o " +
      "JOIN vehiculo v ON o.idvehiculo = v.idvehiculo " +
      "JOIN cliente c ON v.idcliente = c.idcliente " +
      "JOIN forma_pago fp ON o.id_forma_pago = fp.id_forma_pago " +
      "JOIN estado e ON o.idestado = e.idestado " +
      "JOIN usuario u ON u.idusuario = o.idusuario;"
    ); return rows;
  } catch (err) {
    throw err;
  }
};

// get x id
const getOrdenById = async (ordenId) => {
    try {
      const query = 'SELECT v.idtipovehiculo as idtipovehiculo, v.idcliente, o.idorden, o.fecha_carga, v.dominio, v.idvehiculo, o.fecha_turno, o.horario_turno, o.monto_total, fp.id_forma_pago,fp.nombre AS forma_pago, e.idestado, e.nombre AS estado, u.idusuario FROM orden o JOIN vehiculo v ON o.idvehiculo = v.idvehiculo JOIN forma_pago fp ON o.id_forma_pago = fp.id_forma_pago JOIN estado e ON o.idestado = e.idestado JOIN usuario u ON u.idusuario = o.idusuario WHERE o.idorden = ?; -- Reemplaza ? con el ID de orden específico que estás buscando';
      const [rows] = await db.query(query, [ordenId]);
      return rows;
    } catch (err) {
      throw err;
    }
  };

   // post

   const createOrden = async (fecha_carga, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario, servicios) => {
    try {
      const insert = 'INSERT INTO orden (fecha_carga, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      let orden = await db.execute(insert, [fecha_carga, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario]);

      for (let servicio of servicios){
        detalleordenservicioModel.createDetalle(orden[0].insertId,servicio.idservicio)
      }

    } catch (err) {
      throw err;
    }
  };

   //actualizar put

   const updateOrden = async (idorden, fecha_carga, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario, servicios) => {
    try {
      const query = 'UPDATE orden SET fecha_carga=?, idvehiculo=?, fecha_turno=?, horario_turno=?, monto_total=?, id_forma_pago=?, idestado=?, idusuario=? WHERE idorden=?';
      await db.query(query, [fecha_carga, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario, idorden]);
      
      detalleordenservicioModel.getDetalleByOrdenId(idorden)
    console.log(idorden)
    detalleordenservicioModel.deleteDetalleBayOrden(idorden)
      for (let servicio of servicios){
        detalleordenservicioModel.createDetalle(idorden,servicio.idservicio)
      }
    
    //TODO: tenes que buscar la orden y hacer un return 
    return getOrdenById(idorden)
    } catch (err) {
      throw err;
    }
  };

    //delete
const deleteOrden = async (id) => {
    try {
     const query = 'DELETE FROM orden WHERE idorden = ?';
     await db.query(query, [id]);
   } catch (err) {
     throw err;
   }  
 
 };
 
 module.exports = {
   getAllOrdenes,
   createOrden,
   getOrdenById,
   deleteOrden,
   updateOrden
 };
 