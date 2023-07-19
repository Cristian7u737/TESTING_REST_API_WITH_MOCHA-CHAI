import { Router } from "express";
import { findAllAlumnos, findAlumnoById, createAlumnoByIdCursoAndByIdProfesor, updateAlumnoById, deleteAlumnoById } from "../controllers/alumno.controller.js";
const routerAlumno = Router();

routerAlumno.get('/alumnos/', findAllAlumnos );
routerAlumno.get('/alumno/:id', findAlumnoById );
routerAlumno.post('/alumno/create/:id/curso/:id/profesor', createAlumnoByIdCursoAndByIdProfesor );
routerAlumno.put('/alumno/update/:id/curso/:id/alumno', updateAlumnoById );
routerAlumno.delete('/alumno/delete/:id', deleteAlumnoById );

export default routerAlumno;