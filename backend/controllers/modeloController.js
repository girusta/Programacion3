const modeloModel = require('../models/modeloModel');

// Crear un nuevo modelo
const createModelo = async (req, res) => {
    try {
      const { nombre, idmarca } = req.body;
  
      if (!nombre || !idmarca) {
        return res.status(400).json({ error: 'Los campos son obligatorios' });
      }
  
      await modeloModel.createModelo(nombre, idmarca);
  
      console.log('Modelo creado con éxito');
      res.status(201).json({ mensaje: 'Modelo creado con éxito' });
    } catch (err) {
      console.error('Error al crear el modelo:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  // Obtener todos los modelos con vista de nombre_modelo y nombre_marca
const getModelsView = async (req, res) => {
    try {
      const modelos = await modeloModel.getModelsView();
      res.status(200).json({ modelos });
    } catch (err) {
      console.error('Error al obtener los modelos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Obtener un modelo por su ID
  const getModeloById = async (req, res) => {
    try {
      const { id } = req.params;
      const modelo = await modeloModel.getModeloById(id);
  
      if (!modelo) {
        return res.status(404).json({ error: 'Modelo no encontrado' });
      }
  
      res.status(200).json({ modelo });
    } catch (err) {
      console.error('Error al obtener el modelo por ID:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Actualizar un modelo por su ID
  const updateModelo = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, idmarca } = req.body;
  
      if (!nombre || !idmarca) {
        return res.status(400).json({ error: 'Los campos son obligatorios' });
      }
  
      const modelo = await modeloModel.updateModelo(id, nombre, idmarca);
  
      if (!modelo) {
        return res.status(404).json({ error: 'Modelo no encontrado' });
      }
  
      console.log('Modelo actualizado con éxito');
      res.status(200).json({ mensaje: 'Modelo actualizado con éxito' });
    } catch (err) {
      console.error('Error al actualizar el modelo:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Eliminar un modelo por su ID
  const deleteModelo = async (req, res) => {
    try {
      const { id } = req.params;
      const modelo = await modeloModel.deleteModelo(id);
  
      if (!modelo) {
        return res.status(404).json({ error: 'Modelo no encontrado' });
      }
  
      console.log('Modelo eliminado con éxito');
      res.status(200).json({ mensaje: 'Modelo eliminado con éxito' });
    } catch (err) {
      console.error('Error al eliminar el modelo:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = {
    createModelo,
    getModelsView,
    getModeloById,
    updateModelo,
    deleteModelo
  };