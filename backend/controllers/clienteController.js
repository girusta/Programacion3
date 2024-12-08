
// -- importacion del modelo para interactuar con la base de datos -- 

const clienteModel = require('../models/clientemodel');

// obtener todos los clientes.
const getAllClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.getAllClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes.' });
  }
};

// Crear un nuevo usuario (POST)
const createCliente = async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, telefono, email, domicilio, idlocalidad, estado, observaciones } = req.body;

    // Verifica si los datos requeridos están presentes
    if (!nombre || !telefono || !domicilio || !idlocalidad || !estado) {
      return res.status(400).json({ error: 'Nombre, teléfono, domicilio, idlocalidad y estado son obligatorios' });
    }

    // Llama al modelo para insertar el cliente
    await clienteModel.createCliente(nombre, telefono, email, domicilio, idlocalidad, estado, observaciones);

    console.log('Cliente creado con éxito');
    res.status(201).json({ mensaje: 'Cliente creado con éxito' });
  } catch (err) {
    console.error('Error al crear el cliente:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un nuevo usuario (PUT)
const updateCliente = async (req, res) => {
  try {
    const { idcliente, nombre, telefono, email, domicilio, idlocalidad, estado, observaciones } = req.body;

    // Verifica si los datos requeridos están presentes
    if (!idcliente || !nombre || !telefono || !domicilio || !idlocalidad || !estado) {
      return res.status(400).json({ error: 'ID de cliente, nombre, teléfono, domicilio, idlocalidad y estado son obligatorios' });
    }

    // Llama al modelo para actualizar el cliente
    await clienteModel.updateCliente(idcliente, nombre, telefono, email, domicilio, idlocalidad, estado, observaciones);

    console.log('Cliente actualizado con éxito');
    res.status(200).json({ mensaje: 'Cliente actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar el cliente:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un solo usuario por su ID (GET)
const getClienteById = async (req, res) => {
  try {
    console.log('Params:', req.params);  // Agrega esta línea para imprimir todos los parámetros
    const clienteId = req.params.id;
    console.log(`Solicitud GET para el cliente con ID: ${clienteId}`);

    const cliente = await clienteModel.getClienteById(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    res.json(cliente);
  } catch (err) {
    console.error('Error al obtener el cliente:', err);
    res.status(500).json({ error: 'Error al obtener el cliente.' });
  }
};

// Eliminar cliente
const deleteCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const cliente = await clienteModel.deleteCliente(clienteId);

    return res.status(201).json({ message: 'Cliente Eliminado.' + req.params.id });

  } catch (err) { 
    console.error('Error al eliminar el cliente:', err);
    res.status(500).json({ error: 'Error al eliminar el cliente.' });
  }
};

module.exports = {
  getAllClientes,
  createCliente,
  getClienteById,
  deleteCliente,
  updateCliente
};
