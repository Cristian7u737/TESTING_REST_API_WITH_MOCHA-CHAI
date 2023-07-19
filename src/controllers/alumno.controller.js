/* Importar los modelos Alumno, Curso y Profesor */
import { Alumno } from "../models/alumno.model.js";
import { Curso } from "../models/curso.model.js";
import { Profesor } from "../models/profesor.model.js";

/* Encontrar todos los alumnos que hayan */
const findAllAlumnos = async (req, res) => {
    try {
        const alumno = await Alumno.findAll(); /* busca todos los registros del Alumno */
        return res.json(alumno); /* la respuesta es lo que encontro alumno en un objeto json */
    } catch (error) {
        return res.status(500).json([{ error: error.message }]);
    }
};

/* Encontrar un Alumno apartir de un ID */
const findAlumnoById = async (req, res) => {
    const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
    const alumno = await Alumno.findOne({ where: { id } }); /* recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL */
    if (!alumno) { /* evalua si el id de alumno es diferente / osea que no lo encuentra registrado */
        return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
            mensaje: `No existe el alumno con el ID : ${id}.` /* manda un mensaje acerca del alumno que no se encontro con el id */
        });
    }
    res.json(alumno); /* responde la solicitud en formato JSON de lo que se almaceno en alumno */
};

/* Crear un Alumno*/
const createAlumnoByIdCursoAndByIdProfesor = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const { nombreAlumno, cedulaAlumno, telefonoAlumno, correoAlumno, cursoId, profesorId } = req.body; /* desestructurar el json del body */
        const existsTelefonoAlumno = await Alumno.findOne({ where: { telefonoAlumno } });/* busca dentro de Alumno si su Telefono estara repetida */
        const existsCedulaAlumno = await Alumno.findOne({ where: { cedulaAlumno } }); /* busca dentro de Alumno si su Cedula estara repetida */
        const existsCorreoAlumno = await Alumno.findOne({ where: { correoAlumno } }); /* busca dentro de Alumno si su Cedula estara repetida */
        const curso = await Curso.findOne({ where: { id } }); /* busca en Curso por id */
        const profesor = await Profesor.findOne({ where: { id } }); /* busca en Profesor por id */
        if (!curso) { /* evalua si el id de Curso es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No se puede crear el Alumno porque no existe el Curso con el id : ${id}.` /* manda un mensaje acerca del Curso que no se encontro con el id */
            });
        } else if (!profesor) { /* evalua si el id de Profesor es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No se puede crear el Alumno porque no existe el Profesor con el id : ${id}.` /* manda un mensaje acerca del Profesor que no se encontro con el id */
            });
        } else if (existsCedulaAlumno) { /* verifica si la Cedula del Alumno esta repetido o no */
            return res.json({ mensaje: `El Alumno con la cedula : ${cedulaAlumno} ya existe.` }); /* si esta repetido se lo indica */
        } else if (existsTelefonoAlumno) { /* verifica si el Telefono del Alumno esta repetido o no */
            return res.json({ mensaje: `El Alumno con el telefono : ${telefonoAlumno} ya existe.` }); /* si esta repetido se lo indica */
        } else if (existsCorreoAlumno) { /* verifica si el Correo del Alumno esta repetido o no */
            return res.json({ mensaje: `El Alumno con el correro : ${correoAlumno} ya existe.` }); /* si esta repetido se lo indica */
        }
        const newAlumno = await Alumno.create({ nombreAlumno, cedulaAlumno, telefonoAlumno, correoAlumno, cursoId, profesorId }); /* Crea el Alumno apartir del req.body */
        console.log(newAlumno);
        return res.status(201).json(newAlumno); /* responde la solicitud con lo que creo en newAlumno */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Actualizar una Alumno*/
const updateAlumnoById = async (req, res) => {
    try {
        const { cedulaAlumno, telefonoAlumno, correoAlumno } = req.body; /* desestructura el objeto json para obtener el parametro name apartir de req */
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const alumno = await Alumno.findOne({ where: { id } }); /* busca en Alumno por id para actualizarlo despues*/
        const curso = await Curso.findOne({ where: { id } }); /* busca en Curso por id para actualizarlo despues*/
        const profesor = await Profesor.findOne({ where: { id } }); /* busca en Profesor por id para actualizarlo despues*/
        const existsCedulaAlumno = await Alumno.findOne({ where: { cedulaAlumno } }); /* busca dentro de alumno si la Cedula estara repetido */
        const existsTelefonoAlumno = await Alumno.findOne({ where: { telefonoAlumno } });/* busca dentro de Alumno si su Telefono estara repetida */
        const existsCorreoAlumno = await Alumno.findOne({ where: { correoAlumno } }); /* busca dentro de Alumno si su Cedula estara repetida */
        if (!curso) { /* evalua si el id de Curso es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No se puede actualizar el Alumno porque no existe el Curso con el id : ${id}.` /* manda un mensaje acerca del Curso que no se encontro con el id */
            });
        } else if (!profesor) { /* evalua si el id de Profesor es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No se puede actualizar el Alumno porque no existe el Profesor con el id : ${id}.` /* manda un mensaje acerca del Profesor que no se encontro con el id */
            });
        } else if (!alumno) { /* si el id de alumno es diferente */
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No existe el Alumno con el ID: ${id}.` /* manda un mensaje acerca del Alumno que no se encontro con el id */
            }); /* evalua si la Cedula es diferente del Alumno / osea que no lo encuentra registrado*/
        } else if (existsTelefonoAlumno) { /* verifica si el Telefono del Alumno esta repetido o no */
            return res.json({ mensaje: `El Alumno con el telefono : ${telefonoAlumno} ya existe.` }); /* si esta repetido se lo indica */
        } else if (existsCorreoAlumno) { /* verifica si el Correo del Alumno esta repetido o no */
            return res.json({ mensaje: `El Alumno con el correro : ${correoAlumno} ya existe.` }); /* si esta repetido se lo indica */
        } else if (existsCedulaAlumno) {
            return res.json({ mensaje: `El Alumno con la cedula : ${cedulaAlumno} ya existe.` }); /* si esta repetido se lo indica */
        }
        alumno.set(req.body);/* actualiza los datos mediante set */
        await alumno.save(); /* guardar en memoria los datos  */
        res.status(202).json(alumno); /* responde con un objeto json que contiene la información actualizada del alumno */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Eliminar una Alumno apartir de su id*/
const deleteAlumnoById = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const alumno = await Alumno.destroy({ where: { id } }); /* elimina un alumno apartir de un id */
        if (!alumno) { /* evalua si el id del alumno es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({
                mensaje: `No existe el Alumno con el id : ${id}.`
            });
        }
        res.json({ mensaje: `Se ha eliminado el Alumno con el ID : ${id}.` }) /* si esta repetido se lo indica */
        res.status(204).end(); /* status: ya no hay nada con 204 */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

export { findAllAlumnos, findAlumnoById, createAlumnoByIdCursoAndByIdProfesor, updateAlumnoById, deleteAlumnoById }


