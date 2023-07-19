import { Router } from "express";
import { findAllProfesores, findProfesorById, createProfesorByIdCurso, updateProfesorById, deleteProfesorById } from "../controllers/profesor.controller.js";
const routerProfesor = Router();

routerProfesor.get('/profesores/', findAllProfesores );
routerProfesor.get('/profesor/:id', findProfesorById );
routerProfesor.post('/profesor/create/:id/curso', createProfesorByIdCurso );
routerProfesor.put('/profesor/update/:id/curso/:id/profesor', updateProfesorById );
routerProfesor.delete('/profesor/delete/:id', deleteProfesorById );

export default routerProfesor;