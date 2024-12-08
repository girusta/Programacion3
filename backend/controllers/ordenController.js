const ordenModel = require('../models/ordenModel');

// Crear un nuevo vehículo
const createOrden = async (req, res) => {
  try {
    const { fecha, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario, servicios } = req.body;
 
    if (!fecha || !idvehiculo || !fecha_turno || !horario_turno 
      || !monto_total || !id_forma_pago || !idestado || !idusuario || !servicios) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    await ordenModel.createOrden(fecha, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario, servicios);

    console.log('orden creada con éxito');
    res.status(201).json({ mensaje: 'Orden creado con éxito' });
  } catch (err) {
    console.error('Error al crear la orden:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// get
const getAllOrdenes = async (req, res) => {
  try {
    const ordenes = await ordenModel.getAllOrdenes();
    res.status(200).json({ ordenes });
  } catch (err) {
    console.error('Error al obtener las ordenes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// get x id
const getOrdenById = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await ordenModel.getOrdenById(id);

    if (!orden) {
      return res.status(404).json({ error: 'Orden no encontrado' });
    }

    res.status(200).json({ orden });
  } catch (err) {
    console.error('Error al obtener la orde por ID:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un vehículo por su ID
const updateOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { idorden,  fecha, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario, servicios } = req.body;
    
    if (!idorden ||!fecha || !idvehiculo || !fecha_turno || !horario_turno 
      || !monto_total || !id_forma_pago || !idestado || !idusuario || !servicios) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const orden = await ordenModel.updateOrden(id, fecha, idvehiculo, fecha_turno, horario_turno, monto_total, id_forma_pago, idestado, idusuario, servicios);

    if (!orden) {
      return res.status(404).json({ error: 'orden no encontrado' });
    }

    console.log('Orden actualizado con éxito');
    res.status(200).json({ mensaje: 'orden actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar la orden:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar  por su ID
const deleteOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await ordenModel.deleteOrden(id);

    if (!orden) {
      return res.status(404).json({ error: 'Orden no encontrado' });
    }

    console.log('orden eliminada con éxito');
    res.status(200).json({ mensaje: 'Orden eliminada con éxito' });
  } catch (err) {
    console.error('Error al eliminar la orden:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createOrden,
  getAllOrdenes,
  getOrdenById,
  updateOrden,
  deleteOrden
};