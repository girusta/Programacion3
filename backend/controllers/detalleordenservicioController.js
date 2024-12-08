const detalleordenservicioModel = require('../models/detalleordenservicioModel');


// get
const getAllDetalles = async (req, res) => {
  try {
    console.log('Params:', req.params);  // Agrega esta línea para imprimir todos los parámetros
      const idorden = req.params.idorden;
    const detalles = await detalleordenservicioModel.getAllDetalles(idorden);
    res.json(detalles);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los detalles.' });
  }
};

// Crear (POST)

const createDetalle = async (req, res) => {
    try {
      // Obtén los datos del cuerpo de la solicitud
      const { idorden, idservicio } = req.body;
  
      // Verifica si los datos requeridos están presentes
      if (!idorden || !idservicio ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
    // Llama al modelo para insertar el cliente
      await detalleordenservicioModel.createDetalle(idorden, idservicio);
  
      console.log('detalle creado con éxito');
      res.status(201).json({ mensaje: 'detalle creado con éxito' });
    } catch (err) {
      console.error('Error al crear el detalle:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // Actualizar  (put)
  
  
  const updateDetalle = async (req, res) => {
    try {
      const { iddetalle, idorden, idservicio } = req.body;
  
      if (!iddetalle || !idorden || !idservicio ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      await detalleordenservicioModel.updateDetalle(iddetalle, idorden, idservicio);
  
      console.log('detalle actualizado con éxito');
      res.status(200).json({ mensaje: 'detalle actualizado con éxito' });
    } catch (err) {
      console.error('Error al actualizar el detalle:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  // ID (GET)
  const getDetalleById = async (req, res) => {
    try {
      console.log('Params:', req.params);  // Agrega esta línea para imprimir todos los parámetros
      const detalleId = req.params.id;
      console.log(`Solicitud GET para el detalle con ID: ${detalleId}`);
  
      const detalle = await detalleordenservicioModel.getDetalleById(detalleId);
      if (!detalle) {
        return res.status(404).json({ message: 'detalle no encontrado.' });
      }
      res.json(detalle);
    } catch (err) {
      console.error('Error al obtener el detalle:', err);
      res.status(500).json({ error: 'Error al obtener el detalle.' });
    }
  };
  
  // eliminar detalle
  const deleteDetalle = async (req, res) => {
    try {
      const detalleId = req.params.id;
      const detalle = await detalleordenservicioModel.deleteDetalle(detalleId);
  
      return res.status(201).json({ message: 'detalle Eliminado.' + req.params.id});
  
    } catch (err) { 
      console.error('Error al eliminar el detalle:', error);
      res.status(500).json({ error: 'Error al eliminar el detalle.' });
    }
  };
  
  
  module.exports = {
    getAllDetalles,
    createDetalle,
    getDetalleById,
    deleteDetalle,
    updateDetalle
  };
  