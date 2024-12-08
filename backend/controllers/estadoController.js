const estadoModel = require('../models/estadoModel');

// get
const getAllEstados = async (req, res) => {
    try {
      const estados = await estadoModel.getAllEstados();
      res.json(estados);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener estados.' });
    }
  };

// get por id
const getEstadoById = async (req, res) => {
    try {
      const estadoId = req.params.id;
      const estado = await estadoModel.getEstadoById(estadoId);
      if (!estado) {
        return res.status(404).json({ message: 'Estado no encontrado.' });
      }
      res.json(estado);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el estado.' });
    }
  };
  
  module.exports = {
    getAllEstados,
    getEstadoById
};