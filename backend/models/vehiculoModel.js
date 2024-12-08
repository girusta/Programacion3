const db = require('../database');

// Obtener todos los vehículos con información detallada
const getVehiculosDetallados = async () => {
    try {
      const query = `
      SELECT
      v.idvehiculo,
      v.dominio,
      v.estado,
      c.idcliente AS idcliente,
      c.nombre AS nombre_cliente,
      ma.nombre AS nombre_marca,
      mo.nombre AS nombre_modelo,
      tv.idtipovehiculo AS id_tipo_vehiculo,
      tv.nombre AS nombre_tipo_vehiculo
  FROM
      vehiculo v
  JOIN
      cliente c ON v.idcliente = c.idcliente
  JOIN
      modelo mo ON v.idmodelo = mo.idmodelo
  JOIN
      marca ma ON mo.idmarca = ma.idmarca
  JOIN
      tipovehiculo tv ON v.idtipovehiculo = tv.idtipovehiculo;`;
      const [vehiculos] = await db.query(query);
      return vehiculos;
    } catch (err) {
      throw err;
    }
  };

  // Obtener un vehículo por su ID con información detallada
const getVehiculoDetalladoById = async (id) => {
    try {
      const query = `
      SELECT
      v.dominio,
      c.nombre AS nombre_cliente,
      c.idcliente,
      m.nombre AS nombre_marca,
      m.idmarca,
      mo.nombre AS nombre_modelo,
      mo.idmodelo,
      tv.nombre AS nombre_tipo_vehiculo,
      tv.idtipovehiculo,
      v.estado
  FROM vehiculo v
  JOIN cliente c ON v.idcliente = c.idcliente
  JOIN modelo mo ON v.idmodelo = mo.idmodelo
  JOIN marca m ON mo.idmarca = m.idmarca
  JOIN tipovehiculo tv ON v.idtipovehiculo = tv.idtipovehiculo
  WHERE v.idvehiculo = ?
      `;
      const [vehiculo] = await db.query(query, [id]);
      return vehiculo[0];
    } catch (err) {
      throw err;
    }
  };
  
// Crear un nuevo vehículo
const createVehiculo = async (dominio, idcliente, idmodelo, idtipovehiculo, estado) => {
    try {
      const query = 'INSERT INTO vehiculo (dominio, idcliente, idmodelo, idtipovehiculo, estado) VALUES (?, ?, ?, ?, ?)';
      await db.query(query, [dominio, idcliente, idmodelo, idtipovehiculo, estado]);
    } catch (err) {
      throw err;
    }
  };

// Actualizar un vehículo por su ID
const updateVehiculo = async (id, dominio, idcliente, idmodelo, idtipovehiculo, estado) => {
    try {
      const query = 'UPDATE vehiculo SET dominio = ?, idcliente = ?, idmodelo = ?, idtipovehiculo = ?, estado = ? WHERE idvehiculo = ?';
      const [result] = await db.query(query, [dominio, idcliente, idmodelo, idtipovehiculo, estado, id]);
      return result.changedRows > 0 ? { id } : null;
    } catch (err) {
      throw err;
    }
  };


// Eliminar un vehículo por su ID
const deleteVehiculo = async (id) => {
    try {
      const query = 'DELETE FROM vehiculo WHERE idvehiculo = ?';
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0 ? { id } : null;
    } catch (err) {
      throw err;
    }
  };
  
  module.exports = {
    createVehiculo,
    getVehiculosDetallados,
    getVehiculoDetalladoById,
    updateVehiculo,
    deleteVehiculo
  };