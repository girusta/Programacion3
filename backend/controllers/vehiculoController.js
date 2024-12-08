const vehiculoModel = require('../models/vehiculoModel');

// Crear un nuevo vehículo
const createVehiculo = async (req, res) => {
  try {
    const { dominio, idcliente, idmodelo, idtipovehiculo, estado } = req.body;

    if (!dominio || !idcliente || !idmodelo || !idtipovehiculo || !estado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    await vehiculoModel.createVehiculo(dominio, idcliente, idmodelo, idtipovehiculo, estado);

    console.log('Vehículo creado con éxito');
    res.status(201).json({ mensaje: 'Vehículo creado con éxito' });
  } catch (err) {
    console.error('Error al crear el vehículo:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los vehículos con información detallada
const getVehiculosDetallados = async (req, res) => {
  try {
    const vehiculos = await vehiculoModel.getVehiculosDetallados();
    res.status(200).json({ vehiculos });
  } catch (err) {
    console.error('Error al obtener los vehículos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un vehículo por su ID con información detallada
const getVehiculoDetalladoById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await vehiculoModel.getVehiculoDetalladoById(id);

    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    res.status(200).json( vehiculo );
  } catch (err) {
    console.error('Error al obtener el vehículo detallado por ID:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un vehículo por su ID
const updateVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { dominio, idcliente, idmodelo, idtipovehiculo, estado } = req.body;

    if (!dominio || !idcliente || !idmodelo || !idtipovehiculo || !estado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const vehiculo = await vehiculoModel.updateVehiculo(id, dominio, idcliente, idmodelo, idtipovehiculo, estado);

    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    console.log('Vehículo actualizado con éxito');
    res.status(200).json({ mensaje: 'Vehículo actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar el vehículo:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un vehículo por su ID
const deleteVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await vehiculoModel.deleteVehiculo(id);

    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    console.log('Vehículo eliminado con éxito');
    res.status(200).json({ mensaje: 'Vehículo eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar el vehículo:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createVehiculo,
  getVehiculosDetallados,
  getVehiculoDetalladoById,
  updateVehiculo,
  deleteVehiculo
};