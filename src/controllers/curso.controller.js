/* Importar modelos ALumno, Curso, Profesor */
import { Alumno } from "../models/alumno.model.js";
import { Curso } from "../models/curso.model.js";
import { Profesor } from './../models/profesor.model.js';

/* Encontrar todos los Cursos que hayan */
const findAllCursos = async (req, res) => {
    try {
        const curso = await Curso.findAll(); /* busca todos los registros */
        res.json(curso); /* la respuesta es lo que encontro curso en un objeto json */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Encontrar un Curso apartir de un ID */
const findCursoById = async (req, res) => {
    const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
    const curso = await Curso.findOne({ where: { id } }); /* recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL */
    if (!curso) { /* evalua si el id de curso es diferente / osea que no lo encuentra registrado*/
        return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
            mensaje: `No existe el curso con el ID : ${id}.` /* manda un mensaje acerca del curso que no se encontro con el id */
        });
    }
    res.json(curso); /* responde la solicitud en formato JSON de lo que se almaceno en curso */
};

/* Encontrar una Curso apartir de un ID y sus Alumnos que esten relacionados a ese ID */
const findCursoByIdFromAlumno = async (req, res) => {
    const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
    const curso = await Curso.findOne({ where: { id }, include: { model: Alumno, attributes: ['nombreAlumno', 'cedulaAlumno'] } }); /* busca en Curso por id e incluye el modelo Alumno para traerselos si esta ligado a ese ID del Curso*/
    if (!curso) { /* evalua si el id de Curso es diferente / osea que no lo encuentra registrado*/
        return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
            mensaje: `No existe el Curso con el ID:${id} y no tiene algun Alumno ligado a este.` /* manda un mensaje acerca del curso que no se encontro con el id */
        });
    }
    res.json(curso); /* responde la solicitud en formato JSON de lo que se almaceno en Curso */
};

/* Encontrar una Curso apartir de un ID y sus Profesores que esten relacionados a ese ID */
const findCursoByIdFromProfesor = async (req, res) => {
    const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
    const curso = await Curso.findOne({ where: { id }, include: { model: Profesor, attributes: ['nombreProfesor', 'cedulaProfesor', 'profesionProfesor'] } }); /* busca en Curso por id e incluye el modelo Profesor para traerselos si esta ligado a ese ID del Curso*/
    if (!curso) { /* evalua si el id de Curso es diferente / osea que no lo encuentra registrado*/
        return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
            mensaje: `No existe el Curso con el ID:${id} y no tiene algun Profesor ligado a este.` /* manda un mensaje acerca del curso que no se encontro con el id */
        });
    }
    res.json(curso); /* responde la solicitud en formato JSON de lo que se almaceno en Curso */
};

/* Crear un Curso*/
const createCurso = async (req, res) => {
    try {
        const { nombreCurso, precioCurso, dateCurso } = req.body; /* desestructurar el json del body */
        const existsNombreCurso = await Curso.findOne({ where: { nombreCurso } }); /* busca dentro de curso si el nombre del curso estara repetido */
        if (existsNombreCurso) { /* verifica si el Nombre del Curso esta repetido o no */
            return res.json({ mensaje: `El Curso con el nombre : ${nombreCurso} ya existe.` }); /* si esta repetido se lo indica */
        } else {
            const newCurso = await Curso.create({ nombreCurso, precioCurso, dateCurso }); /* Crea el Curso apartir del req.body */
            return res.status(201).json(newCurso); /* responde la solicitud con lo que creo en newCurso */
        }
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Actualizar una Curso*/
const updateCursoById = async (req, res) => {
    try {
        const { nombreCurso } = req.body; /* desestructurar el json del body */
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const curso = await Curso.findOne({ where: { id } }); /* busca en Curso por id para actualizarlo despues*/
        const existsNombreCurso = await Curso.findOne({ where: { nombreCurso } }); /* busca dentro de curso si el nombre del curso estara repetido */
        if (!curso) { /* si el id de curso es diferente */
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No existe el Curso con el ID : ${id}.` /* manda un mensaje acerca del Curso que no se encontro con el id */
            }); /* evalua si el Nombre del Curso es diferente del Curso / osea que no lo encuentra registrado*/
        } else if (existsNombreCurso) { /* verifica si el Nombre del Curso esta repetido o no */
            return res.json({ mensaje: `El Curso con el Nombre : ${nombreCurso} ya existe.` }); /* si esta repetido se lo indica */
        }
        curso.set(req.body);/* actualiza los datos mediante set */
        await curso.save(); /* guardar en memoria los datos  */
        res.status(202).json(curso); /* responde con un objeto json que contiene la información actualizada del curso */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Eliminar un Curso apartir de su id*/
const deleteCursoById = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const curso = await Curso.destroy({ where: { id } }); /* elimina un curso apartir de un id */
        if (!curso) { /* evalua si el id del curso es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({
                mensaje: `No existe el Curso con el id : ${id}.`
            });
        }
        res.json({ mensaje: `Se ha eliminado el Curso con el ID : ${id}.` }) /* si esta repetido se lo indica */
        res.status(204).end(); /* status: ya no hay nada con 204 */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

export {findAllCursos, findCursoById, findCursoByIdFromAlumno, findCursoByIdFromProfesor, createCurso, updateCursoById, deleteCursoById }