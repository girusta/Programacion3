const localidadModel = require('../models/localidadModel');

// metodo para obtener todas las localidades
const getAllLocalidades = async (req, res) => {
    try {
      const localidades = await localidadModel.getAllLocalidades();
      res.json(localidades);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener localidades.' });
    }
  };

// Obtener un solo usuario por su ID (GET)
const getLocalidadById = async (req, res) => {
    try {
      const localidadId = req.params.id;
      const localidad = await localidadModel.getLocalidadById(localidadId);
      if (!localidad) {
        return res.status(404).json({ message: 'Localidad no encontrada.' });
      }
      res.json(localidad);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener la localidad.' });
    }
  };
  
  module.exports = {
    getAllLocalidades,
    getLocalidadById
};