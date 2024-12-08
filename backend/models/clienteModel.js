/* Modelo - Base de datos */
const db = require('../database');

// método para obtener todos los clientes desde la base de datos

const getAllClientes = async () => {
  try {
    const [rows] = await db.query('SELECT c.idcliente AS idcliente, c.nombre AS Nombre, c.telefono AS Telefono, c.email AS Email, c.domicilio AS Domicilio, c.estado AS Estado, c.observaciones AS Observaciones, l.localidad AS Localidad FROM lavaderogi2024.cliente c JOIN lavaderogi2024.localidad l ON ((c.idlocalidad = l.idlocalidad))');
    return rows;
  } catch (err) {
    throw err;
  }
};

// método para obtener un cliente por id
const getClienteById = async (clienteId) => {
    try {
      const query = 'SELECT * FROM cliente WHERE idcliente = ?';
      const [rows] = await db.query(query, [clienteId]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

// Crear un nuevo cliente en la base de datos (POST)
const createCliente = async (nombre, telefono, email, domicilio, idlocalidad, estado, observaciones) => {
  try {
    const query = 'INSERT INTO cliente (nombre, telefono, email, domicilio, idlocalidad, estado, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await db.query(query, [nombre, telefono, email || null, domicilio, idlocalidad, estado, observaciones || null]);
  } catch (err) {
    throw err;
  }
};

  // Actualizar cliente (PUT)
const updateCliente = async (idcliente, nombre, telefono, email, domicilio, idlocalidad, estado, observaciones) => {
  try {
    const query = 'UPDATE cliente SET nombre=?, telefono=?, email=?, domicilio=?, idlocalidad=?, estado=?, observaciones=? WHERE idcliente=?';
    await db.query(query, [nombre, telefono, email || null, domicilio, idlocalidad, estado, observaciones || null, idcliente]);
  } catch (err) {
    throw err;
  }
};

// Eliminar cliente
const deleteCliente = async (id) => {
  try {
    const query = 'DELETE FROM cliente WHERE idcliente = ?';
    await db.query(query, [id]);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllClientes,
  createCliente,
  getClienteById,
  deleteCliente,
  updateCliente
}; 