const express = require('express');
const app = express();
const db = require('./database');
const cors = require('cors');


// Habilita CORS para permitir solicitudes cors a todas las rutas. //
app.use(cors({}));

// Middleware para parsear JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuracion de rutas//
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuario', usuarioRoutes);
const localidadRoutes = require('./routes/localidadRoutes');
app.use('/localidad', localidadRoutes);
const clienteRoutes = require('./routes/clienteRoutes');
app.use('/cliente', clienteRoutes);
const marcaRoutes = require('./routes/marcaRoutes');
app.use('/marca', marcaRoutes);
const modeloRoutes = require('./routes/modeloRoutes');
app.use('/modelo', modeloRoutes);
const tipovehiculoRoutes = require('./routes/tipovehiculoRoutes');
app.use('/tipovehiculo', tipovehiculoRoutes);
const vehiculoRoutes = require('./routes/vehiculoRoutes');
app.use('/vehiculo', vehiculoRoutes);
const estadoRoutes = require('./routes/estadoRoutes');
app.use('/estado', estadoRoutes);
const formadepagoRoutes = require('./routes/formapagoRoutes');
app.use('/formadepago', formadepagoRoutes);
const ordenRoutes = require('./routes/ordenRoutes');
app.use('/orden', ordenRoutes);
const servicioRoutes = require('./routes/servicioRoutes');
app.use('/servicio', servicioRoutes);
const detalleRoutes = require('./routes/detalleRoutes');
app.use('/detalle', detalleRoutes);

// Iniciar servidor - puerto solicitudes
const port = 3007;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
