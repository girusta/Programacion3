/* Modelo - Base de datos */
const db = require('../database');


// get

const getAllServicios = async (idtipovehiculo) => {
    try {
      let where = "";
      if (idtipovehiculo!="undefined" & idtipovehiculo!="" ){
        where = " where idtipovehiculo="+idtipovehiculo
      }
      const [rows] = await db.query("SELECT * FROM servicio"+where)
      return rows;
    } catch (err) {
      throw err;
    }
  };

  // get x id
const getServicioById = async (ordenId) => {
    try {
      const query = 'SELECT * FROM vista_servicio_info WHERE idservicio = ?';
      const [rows] = await db.query(query, [ordenId]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

      // post

      const createServicio = async (nombre, precio, idtipovehiculo) => {
          try {
            const query = 'INSERT INTO servicio (nombre, precio, idtipovehiculo) VALUES (?, ?, ?)';
            await db.query(query, [nombre, precio, idtipovehiculo]);
          } catch (err) {
            throw err;
          }
        };


      // Verificar si existe un tipo de vehículo por su ID
const checkTipoVehiculoExists = async (idTipoVehiculo) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM tipovehiculo WHERE idtipovehiculo = ?', [idTipoVehiculo]);
    const count = rows[0].count;
    return count > 0; // Retorna true si existe al menos un registro con el ID de tipo de vehículo especificado
  } catch (err) {
    throw err;
  }
};
    
       //actualizar put
    
       const updateServicio = async (idservicio, nombre, precio, idtipovehiculo) => {
        try {
          const query = 'UPDATE servicio SET nombre=?, precio=?, idtipovehiculo=? WHERE idservicio=?';
          await db.query(query, [nombre, precio, idtipovehiculo, idservicio]);
        } catch (err) {
          throw err;
        }
      };
    
        //delete
   // delete
const deleteServicio = async (id) => {
  try {
    const query = 'DELETE FROM servicio WHERE idservicio = ?';
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      // Si no se encontró ningún servicio para eliminar
      return false;
    }
    // Si se eliminó correctamente
    return true;
  } catch (err) {
    throw err;
  }
};
     
     module.exports = {
       getAllServicios,
       createServicio,
       getServicioById,
       deleteServicio,
       updateServicio,
       checkTipoVehiculoExists
     };
     