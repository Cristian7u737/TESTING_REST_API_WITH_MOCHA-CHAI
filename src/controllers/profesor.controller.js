/* Importar modelos de Curso, Profesor */
import { Curso } from "../models/curso.model.js";
import { Profesor } from "../models/profesor.model.js";

/* Encontrar todos los profesores que hayan */
const findAllProfesores = async (req, res) => {
    try {
        const profesor = await Profesor.findAll(); /* busca todos los registros */
        res.json(profesor); /* la respuesta es lo que encontro profesor en un objeto json */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Encontrar un Profesor apartir de un ID */
const findProfesorById = async (req, res) => {
    const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
    const profesor = await Profesor.findOne({ where: { id } }); /* recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL */
    if (!profesor) { /* evalua si el id de profesor es diferente / osea que no lo encuentra registrado*/
        return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
            mensaje: `No existe el profesor con el ID : ${id}.` /* manda un mensaje acerca del profesor que no se encontro con el id */
        });
    }
    res.json(profesor); /* responde la solicitud en formato JSON de lo que se almaceno en profesor */
};

/* Crear un Profesor apartir del Id de un Curso*/
const createProfesorByIdCurso = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const { nombreProfesor, cedulaProfesor, telefonoProfesor, correoProfesor, profesionProfesor, cursoId } = req.body; /* desestructurar el json del body */
        const existsTelefonoProfesor = await Profesor.findOne({ where: { telefonoProfesor } });/* busca dentro de Profesor si su Telefono estara repetida */
        const existsCedulaProfesor = await Profesor.findOne({ where: { cedulaProfesor } }); /* busca dentro de Profesor si su Cedula estara repetida */
        const existsCorreoProfesor = await Profesor.findOne({ where: { correoProfesor } }); /* busca dentro de Profesor si su Cedula estara repetida */
        const curso = await Curso.findOne({ where: { id } }); /* busca en Curso por id */
        if (!curso) { /* evalua si el id de Curso es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No se puede crear el Profesor porque no existe el Curso con el id : ${id}.` /* manda un mensaje acerca de la Alumno que no se encontro con el id */
            });
        } else if (existsCedulaProfesor) { /* verifica si la Cedula del Profesor esta repetido o no */
            return res.json({ mensaje: `El Profesor con la cedula : ${cedulaProfesor} ya existe.` }); /* si esta repetido se lo indica */
        } else if (existsTelefonoProfesor) { /* verifica si el Telefono del Profesor esta repetido o no */
            return res.json({ mensaje: `El Profesor con el telefono : ${telefonoProfesor} ya existe.` }); /* si esta repetido se lo indica */
        } else if (existsCorreoProfesor) { /* verifica si el Correo del Profesor esta repetido o no */
            return res.json({ mensaje: `El Profesor con el correro : ${correoProfesor} ya existe.` }); /* si esta repetido se lo indica */
        } else {
            const newProfesor = await Profesor.create({ nombreProfesor, cedulaProfesor, telefonoProfesor, correoProfesor, profesionProfesor, cursoId }); /* Crea el Profesor apartir del req.body */
            return res.status(201).json(newProfesor); /* responde la solicitud con lo que creo en newProfesor */
        }
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Actualizar una Profesor apartir de su Id*/
const updateProfesorById = async (req, res) => {
    try {
        const { cedulaProfesor, telefonoProfesor, correoProfesor } = req.body; /* desestructura el objeto json para obtener el parametro name apartir de req */
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const profesor = await Profesor.findOne({ where: { id } }); /* busca en Profesor por id para actualizarlo despues*/
        const curso = await Curso.findOne({ where: { id } }); /* busca en Curso por id para actualizarlo despues*/
        const existsCedulaProfesor = await Profesor.findOne({ where: { cedulaProfesor } }); /* busca dentro de profesor si la Cedula estara repetido */
        const existsTelefonoProfesor = await Profesor.findOne({ where: { telefonoProfesor } });/* busca dentro de Profesor si su Telefono estara repetida */
        const existsCorreoProfesor = await Profesor.findOne({ where: { correoProfesor } }); /* busca dentro de Profesor si su Cedula estara repetida */
        if (!curso) { /* evalua si el id de Curso es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No se puede actualizar el Profesor porque no existe el Curso con el id : ${id}.` /* manda un mensaje acerca del Profesor que no se encontro con el id */
            });
        } else if (!profesor) { /* si el id de profesor es diferente */
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No se puede actualizar el Profesor porque no existe el Profesor con el ID : ${id}.` /* manda un mensaje acerca del Profesor que no se encontro con el id */
            }); /* evalua si la Cedula es diferente del Profesor / osea que no lo encuentra registrado*/
        } else if (existsTelefonoProfesor) { /* verifica si el Telefono del Profesor esta repetido o no */
            return res.json({ mensaje: `El Profesor con el telefono : ${telefonoProfesor} ya existe.` }); /* si esta repetido se lo indica */
        } else if (existsCorreoProfesor) { /* verifica si el Correo del Profesor esta repetido o no */
            return res.json({ mensaje: `El Profesor con el correro : ${correoProfesor} ya existe.` }); /* si esta repetido se lo indica */
        } else if (existsCedulaProfesor) {
            return res.json({ mensaje: `El Profesor con la cedula : ${cedulaProfesor} ya existe.` }); /* si esta repetido se lo indica */
        }
        profesor.set(req.body);/* actualiza los datos mediante set */
        await profesor.save(); /* guardar en memoria los datos  */
        res.status(202).json(profesor); /* responde con un objeto json que contiene la información actualizada del profesor */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Eliminar un Profesor apartir de su id*/
const deleteProfesorById = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const profesor = await Profesor.destroy({ where: { id } }); /* elimina un profesor apartir de un id */
        if (!profesor) { /* evalua si el id del profesor es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({
                mensaje: `No existe el Profesor con el id : ${id}.`
            });
        }
        res.json({ mensaje: `Se ha eliminado el Profesor con el ID : ${id}.` }) /* si esta repetido se lo indica */
        res.status(204).end(); /* status: ya no hay nada con 204 */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

export { findAllProfesores, findProfesorById, createProfesorByIdCurso, updateProfesorById, deleteProfesorById }


