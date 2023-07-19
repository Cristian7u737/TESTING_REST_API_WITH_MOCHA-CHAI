/* importar modulos */
import express from 'express'
/* importar conexion */
import  db  from './src/config/connect.js';
/* importar los enrutadores */
import routerAlumno from './src/routes/alumno.routes.js';
import routerProfesor from './src/routes/profesor.routes.js';
import routerCurso from './src/routes/curso.routes.js';
import routerPago from './src/routes/pago.routes.js';

export const app = express(); /* para crear una aplicación usando express */
/* analizar solicitudes de tipo de contenido - application/json */
app.use(express.json()); /* es una función de middleware integrada en Express. Analiza las solicitudes entrantes con cargas JSON y se basa en body-parser */  
/* simple ruta */
app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

/* utilizar los enrutadores */
app.use(routerAlumno);
app.use(routerProfesor);
app.use(routerCurso);
app.use(routerPago);

/* MIDDLEWARE */
/* analizar solicitudes de tipo de contenido - application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

/* Conexión a DB */
try {
    await db.authenticate(); /* se utiliza para conectarse con la base de datos y comprueba si las credenciales proporcionadas son correctas */
    console.log('-> DB connected <-');
} catch (error) {
    console.log(error);
}

/* declaración del puerto */
const PORT = process.env.PORT || 3000;
/* el servidor escucha */
app.listen(PORT, () => console.log(`Servidor corriendo en http//localhost:${PORT}`));