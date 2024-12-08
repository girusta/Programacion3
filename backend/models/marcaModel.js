const db = require('../database');

// Crear una nueva marca
const createMarca = async (nombre) => {
    try {
      const query = 'INSERT INTO marca (nombre) VALUES (?)';
      await db.query(query, [nombre]);
    } catch (err) {
      throw err;
    }
  };
  
  // Obtener todas las marcas
  const getMarcas = async () => {
    try {
      const query = 'SELECT * FROM marca';
      const [marcas] = await db.query(query);
      return marcas;
    } catch (err) {
      throw err;
    }
  };
  
  // Obtener una marca por su ID
  const getMarcaById = async (id) => {
    try {
      const query = 'SELECT * FROM marca WHERE idmarca = ?';
      const [marca] = await db.query(query, [id]);
      return marca[0];
    } catch (err) {
      throw err;
    }
  };
  
  // Actualizar una marca por su ID
  const updateMarca = async (id, nombre) => {
    try {
      const query = 'UPDATE marca SET nombre = ? WHERE idmarca = ?';
      const [result] = await db.query(query, [nombre, id]);
      return result.changedRows > 0 ? { id } : null;
    } catch (err) {
      throw err;
    }
  };
  
  // Eliminar una marca por su ID
  const deleteMarca = async (id) => {
    try {
      const query = 'DELETE FROM marca WHERE idmarca = ?';
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0 ? { id } : null;
    } catch (err) {
      throw err;
    }
  };
  
  module.exports = {
    createMarca,
    getMarcas,
    getMarcaById,
    updateMarca,
    deleteMarca
  };