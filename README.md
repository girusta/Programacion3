# Sistema web para Lavaderos

[![frente](https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=vQNrknZ_GOLnsGe0F_G1hg&cb_client=search.gws-prod.gps&w=800&h=500&yaw=336.3372&pitch=0&thumbfov=100 "frente")](https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=vQNrknZ_GOLnsGe0F_G1hg&cb_client=search.gws-prod.gps&w=800&h=500&yaw=336.3372&pitch=0&thumbfov=100 "frente")


Este proyecto es un sistema para gestionar un lavadero de vehículos. Proporciona funcionalidades completas para manejar clientes, vehículos, órdenes y servicios, con operaciones CRUD y una API bien estructurada.

## Requisitos
- Node.js v16.0.0 o superior
- MySQL v8.0 o superior
## Instalaciones
##### #### Clona el repositorio en tu máquina local:
```html
git clone https://github.com/girusta/programacion2024.git
cd lavadero2024
```
##### Instala las dependencias
```html
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mysql2": "^3.9.1",
    "nodemailer": "^6.9.9",
    "nodemon": "^3.0.3"
  }
```
##### Base de datos
- base de datos creada con el nombre lavaderogi2024
##### Iniciar el servidor desde index.js
```html
nodemon index.js
```
El servidor estará disponible en http://localhost:3007.
## Estructura del proyecto
El proyecto está organizado en los siguientes componentes principales:

1. **Controllers**: Lógica de negocio para gestionar las solicitudes.
2. **Models**: Interacción directa con la base de datos.
3. **Routes**: Definición de los endpoints disponibles.
4. **Database**: Configuración para la conexión a la base de datos MySQL.

### Rutas y Endpoints Disponibles mas importantes
###### Usuarios (/usuario)
POST /iniciar-sesion: Permite iniciar sesión.
GET /: Obtiene todos los usuarios.
GET /: id: Obtiene un usuario por su ID.
###### Vehículos (/vehiculo)
GET /: Obtiene todos los vehículos con información detallada.
POST /: Crea un nuevo vehículo.
GET /: id: Obtiene un vehículo por su ID.
PUT /: id: Actualiza un vehículo existente.
DELETE /: id: Elimina un vehículo por su ID.
###### Clientes (/cliente)
GET /: Obtiene todos los clientes.
POST /: Crea un nuevo cliente.
GET /: id: Obtiene un cliente por su ID.
PUT /: id: Actualiza un cliente existente.
DELETE /: id: Elimina un cliente por su ID.
###### Órdenes (/orden)
GET /: Obtiene todas las órdenes.
POST /: Crea una nueva orden.
GET /: id: Obtiene una orden por su ID.
PUT /: id: Actualiza una orden existente.
DELETE /: id: Elimina una orden por su ID.
###### Servicios (/servicio)
GET /: Obtiene todos los servicios.
POST /: Crea un nuevo servicio.
GET /: id: Obtiene un servicio por su ID.
PUT /: id: Actualiza un servicio existente.
DELETE /: id: Elimina un servicio por su ID.
# Uso de la aplicación
### Login
Ingresar a la aplicacion ejecutando el documento index.html

| Usuario  | Contraseña  |
| ------------ | ------------ |
| gonzalo-irusta  | ax1234 |

### Principal
[Principal](http://127.0.0.1:5501/frontend/html/v1principal.html "Principal")
- En este modulo de la aplicación se visualizan todos los lavados registrados, filtrando en un rango de los ultimos dos meses.

------------


- Además se puede presionar sobre la opción de Mostrar Todos para visualizar todos los registros.

------------


- Se agregan más filtros de busquedas por cliente, dominio y seleccion de un tipo de estado (Terminado, En Lavado, Con Turno, Entregado)

------------


- Por ultimo, segun los filtros seleccionados, se visualiza el monto total facturado o a facturar segun el estado Con Turno.

------------


- El boton Limpiar, permite restablecer la vista de la pagina inicial.

# Licencia
Este proyecto está bajo la licencia ISC.
