  const servicioModel = require('../models/servicioModel');


  // Crear un nuevo servicio
  // Crear un nuevo servicio
  // Crear un nuevo servicio
  const createServicio = async (req, res) => {
    try {
      const { nombre, precio, idtipovehiculo } = req.body;

      // Verificar si el tipo de vehículo especificado es válido
      const tipoVehiculoValido = await servicioModel.checkTipoVehiculoExists(idtipovehiculo);
      if (!tipoVehiculoValido) {
        return res.status(400).json({ error: 'El tipo de vehículo especificado no es válido' });
      }

      // Si el tipo de vehículo es válido, proceder con la creación del servicio
      if (!nombre || !precio || !idtipovehiculo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      await servicioModel.createServicio(nombre, precio, idtipovehiculo);

      console.log('servicio creado con éxito');
      res.status(201).json({ mensaje: 'Servicio creado con éxito' });
    } catch (err) {
      console.error('Error al crear el servicio:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };


  // get
  const getAllServicios = async (req, res) => {
    try {
      const servicios = await servicioModel.getAllServicios(req.query.idtipovehiculo);
      res.status(200).json({ servicios });
    } catch (err) {
      console.error('Error al obtener los servicios:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  // get x id
  const getServicioById = async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await servicioModel.getServicioById(id);

      if (!servicio) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      res.status(200).json({ servicio });
    } catch (err) {
      console.error('Error al obtener el servicio por ID:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  // Actualizar un servicio por su ID
  const updateServicio = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, precio, idtipovehiculo } = req.body;
      if (!nombre || !precio || !idtipovehiculo ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      const servicio = await servicioModel.updateServicio(id, nombre, precio, idtipovehiculo);

      if (!servicio) {
        return res.status(404).json({ error: 'servicio no encontrado' });
      }

      console.log('Servicio actualizado con éxito');
      res.status(200).json({ mensaje: 'servicio actualizado con éxito' });
    } catch (err) {
      console.error('Error al actualizar el servicio:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

    // Eliminar  por su ID
    const deleteServicio = async (req, res) => {
      try {
        const { id } = req.params;
        const servicio = await servicioModel.deleteServicio(id);

        if (!servicio) {
          return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        console.log('servicio eliminado con éxito');
        res.status(200).json({ mensaje: 'Servicio eliminado con éxito' });
      } catch (err) {
        console.error('Error al eliminar el servicio:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    };

  module.exports = {
    createServicio,
    getAllServicios,
    getServicioById,
    updateServicio,
    deleteServicio
  };