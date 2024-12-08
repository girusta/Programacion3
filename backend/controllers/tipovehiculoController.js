const tipovehModel = require('../models/tipovehiculoModel');

// ver todos los usuarios

const getAllTipoVeh = async (req, res) => {
    try {
      const tipovehiculo = await tipovehModel.getAllTipoVeh();
      res.json(tipovehiculo);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener tipo de vehiculo.' });
    }
  };

//ver usuario por su id

 const getTipoVehById = async (req, res) => {
  try {
    const tipovehId = req.params.id;
    const tipoveh = await tipovehModel.getTipoVehById(tipovehId);
    if (!tipoveh) {
      return res.status(404).json({ message: 'tipo de vehiculo no encontrado.' });
    }
    res.json(tipoveh);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el tipo de vehiculo.' });
  }
};

module.exports = {
  getAllTipoVeh,
  getTipoVehById
};
