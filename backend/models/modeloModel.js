const db = require('../database');

// Crear un nuevo modelo
const createModelo = async (nombre, idmarca) => {
  try {
    const query = 'INSERT INTO modelo (nombre, idmarca) VALUES (?, ?)';
    await db.query(query, [nombre, idmarca]);
  } catch (err) {
    throw err;
  }
};

// Obtener todos los modelos con vista de nombre_modelo y nombre_marca

const getModelsView = async () => {
  try {
    const query = 'SELECT m.idmodelo, m.nombre AS nombre_modelo, ma.nombre AS nombre_marca, ma.idmarca FROM modelo m JOIN marca ma ON m.idmarca = ma.idmarca';
    //const query = 'SELECT modelo.idmodelo, modelo.nombre, marca.nombre FROM modelo JOIN marca ON modelo.idmarca = marca.idmarca';
    const [modelos] = await db.query(query);
    return modelos;
  } catch (err) {
    throw err;
  }
};

// Obtener un modelo por su ID
const getModeloById = async (id) => {
    try {
      const query = 'SELECT modelo.idmodelo, modelo.nombre, modelo.idmarca, marca.nombre FROM modelo JOIN marca ON modelo.idmarca = marca.idmarca WHERE modelo.idmodelo = ?';
      const [modelo] = await db.query(query, [id]);
      return modelo[0];
    } catch (err) {
      throw err;
    }
  };

// Actualizar un modelo por su ID
const updateModelo = async (id, nombre, idmarca) => {
  try {
    const query = 'UPDATE modelo SET nombre = ?, idmarca = ? WHERE idmodelo = ?';
    const [result] = await db.query(query, [nombre, idmarca, id]);
    return result.changedRows > 0 ? { id } : null;
  } catch (err) {
    throw err;
  }
};

// Eliminar un modelo por su ID
const deleteModelo = async (id) => {
  try {
    const query = 'DELETE FROM modelo WHERE idmodelo = ?';
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0 ? { id } : null;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createModelo,
  getModelsView,
  getModeloById,
  updateModelo,
  deleteModelo
};
