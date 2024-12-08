const marcaModel = require('../models/marcaModel');

// Crear una nueva marca
const createMarca = async (req, res) => {
    try {
      const { nombre } = req.body;
  
      if (!nombre) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio' });
      }
  
      await marcaModel.createMarca(nombre);
  
      console.log('Marca creada con éxito');
      res.status(201).json({ mensaje: 'Marca creada con éxito' });
    } catch (err) {
      console.error('Error al crear la marca:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Obtener todas las marcas
  const getMarcas = async (req, res) => {
    try {
      const marcas = await marcaModel.getMarcas();
      res.status(200).json({ marcas });
    } catch (err) {
      console.error('Error al obtener las marcas:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Obtener una marca por su ID
  const getMarcaById = async (req, res) => {
    try {
      const { id } = req.params;
      const marca = await marcaModel.getMarcaById(id);
  
      if (!marca) {
        return res.status(404).json({ error: 'Marca no encontrada' });
      }
  
      res.status(200).json({ marca });
    } catch (err) {
      console.error('Error al obtener la marca por ID:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Actualizar una marca por su ID
  const updateMarca = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
  
      if (!nombre) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio' });
      }
  
      const marca = await marcaModel.updateMarca(id, nombre);
  
      if (!marca) {
        return res.status(404).json({ error: 'Marca no encontrada' });
      }
  
      console.log('Marca actualizada con éxito');
      res.status(200).json({ mensaje: 'Marca actualizada con éxito' });
    } catch (err) {
      console.error('Error al actualizar la marca:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Eliminar una marca por su ID
  const deleteMarca = async (req, res) => {
    try {
      const { id } = req.params;
      const marca = await marcaModel.deleteMarca(id);
  
      if (!marca) {
        return res.status(404).json({ error: 'Marca no encontrada' });
      }
  
      console.log('Marca eliminada con éxito');
      res.status(200).json({ mensaje: 'Marca eliminada con éxito' });
    } catch (err) {
      console.error('Error al eliminar la marca:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = {
    createMarca,
    getMarcas,
    getMarcaById,
    updateMarca,
    deleteMarca
  };