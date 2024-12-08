const formadepagoModel = require('../models/formadepagoModel');

// get
const getAllFormaPago = async (req, res) => {
    try {
      const formas = await formadepagoModel.getAllFormaPago();
      res.json(formas);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener formas de pagos.' });
    }
  };

// get por id
const getFormaPagoById = async (req, res) => {
    try {
      const formaId = req.params.id;
      const forma = await formadepagoModel.getFormaPagoById(formaId);
      if (!forma) {
        return res.status(404).json({ message: 'Forma de pago no encontrado.' });
      }
      res.json(forma);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener la forma de pago.' });
    }
  };
  
  module.exports = {
    getAllFormaPago,
    getFormaPagoById
};