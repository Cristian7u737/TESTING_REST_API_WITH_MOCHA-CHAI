/* Importación de los modulos sequelize y dotenv */
import Sequelize  from "sequelize";
import dotenv from "dotenv";
/* Cargar variables de entorno desde el archivo '.env' */
dotenv.config({ path: '.env' });
/* Para conectar con la base de datos debemos instanciar la clase 
Sequelize pasándole al constructor como argumento un objeto con los 
datos para realizar la conexión.*/
const db = new Sequelize(
  process.env.BD_NOMBRE, /* Nombre de la BD */
  process.env.BD_USER, /* Usuario de la BD */
  process.env.BD_PASS ?? "", /* Contraseña de la BD */
  {
    host: process.env.BD_HOST, /* define la ubicación del servidor donde se aloje nuestro sitio web */
    port: process.env.BD_PORT, /* definr el puerto de la base de datos */
    dialect: "mysql",
    timezone: "-05:00",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5, /* número máximo de conexiones en el grupo */
      min: 0, /* número mínimo de conexión en el grupo */
      acquire: 30000, /* tiempo máximo, en milisegundos, ese grupo intentará conectarse antes de arrojar un error */
      idle: 10000, /* tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada */
    },
    operatorsAliases: false,
  }
);

export default db; /* exporta por defecto la constante db que contiene todo para la conexión a BD */
