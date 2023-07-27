/* Durante la prueba, la variable env se establece en prueba */
process.env.NODE_ENV = '.env';

/* Requerir las dependencias de desarrollo */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from "../../server.js";
import { Alumno } from "../models/alumno.model.js";
import db from '../config/connect.js';
import { response } from 'express';


chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe("---------------------- Testing Task APIs -------------------------", () => {
    describe("Access & Connect to DB", async () => {
        it('it SHOULD return a Conection to DB', (done) => {
            db.authenticate((err, response) => {
                if (err) {
                    expect(response).to.have.status(500); /* este objeto le permite usar los métodos de afirmación de Chai para hacer afirmaciones sobre la respuesta esperada de la API. */
                    expect(response.body).to.have.property('message').that.is.equal(err);
                } else {
                    expect(response).to.equal("-> DB connected<-");
                }
            });
            done();
        });
    });

    describe('Test GET route /alumnos', async () => { /* El bloque de descripción anidado agrupa más casos de prueba relacionados,  Esto ayuda a organizar los casos de prueba específicamente relacionados con una funcionalidad particular. */
        it('It should return all alumnos', (done) => { /* esta función describe el comportamiento esperado del extremo de la API. */
            chai.request(app)
                .get("/alumnos/")
                .end((err, response) => { /* esta función envía la solicitud y proporciona una función de devolución de llamada para manejar la respuesta. La función de devolución de llamada realiza aserciones utilizando la función de expectativa para verificar la respuesta recibida de la API. */
                    if (err) { /* Si ocurrio un error al buscar los cursos */
                        expect(response).to.have.status(500); /* este objeto le permite usar los métodos de afirmación de Chai para hacer afirmaciones sobre la respuesta esperada de la API. */
                        expect(response.body).to.have.property('message').that.is.equal(err);
                    } else { /* en caso de que no  */
                        expect(response).to.have.status(200);
                        expect(response.body).to.be.an('array');
                    }

                });
            done(); /* esta función se ejecuta para marcar el final del caso de prueba. */
        });
    });

    describe('Test GET route /alumno/:id', async () => { /* El bloque de descripción anidado agrupa más casos de prueba relacionados,  Esto ayuda a organizar los casos de prueba específicamente relacionados con una funcionalidad particular. */
        it('It should return a alumno by id', (done) => { /* esta función describe el comportamiento esperado del extremo de la API. */
            const alumno = new Alumno({ "nombreProfesor": "Marco", "cedulaProfesor": 206339, "telefonoProfesor": "7826439846", "correoProfesor": "marco@gmail.com", "profesionProfesor": "Maestro de Ingles", "cursoId": 1 });
            alumno.save((err, alumno) => {
                chai.request(app)
                    .put('/alumno/:id' + alumno.id)
                    .send(alumno)
                    .end((err, response) => {
                        if (err) {
                            expect(response).to.have.status(500);
                            expect(response.body).to.have.property('message').that.is.equal(err);
                        } else {
                            expect(response).to.have.status(202);
                            expect(response.body).to.be.an('object');
                        }
                    });
            });
            done();
        });
    });

    describe('Test POST route /alumno/create/:id/curso/:id/profesor', async () => {
        it('it should POST a alumno by the given id of a curso', (done) => {
            const alumno = new Alumno({ "nombreAlumno": "Cristian", "cedulaAlumno": 190220, "telefonoAlumno": "7461304325", "correoAlumno": "nochebuenacristian048@gmail.com", "cursoId": 1, "profesorId": 1 });
            alumno.save((err, alumno) => {
                chai.request(app)
                    .put('/alumno/create/:id/curso/:id/profesor' + alumno.cursoId + alumno.cursoId)
                    .send(alumno)
                    .end((err, response) => {
                        if (err) {
                            expect(response).to.have.status(500);
                            expect(response.body).to.have.property('message').that.is.equal(err);
                            done(err);
                        } else {
                            expect(response).to.have.status(201);
                            expect(response.body).to.be.an('object');
                            done();
                        }
                    });
            });
            done();
        });
    });

    describe('Test PUT route /alumno/update/:id/curso/:id/profesor/:id/alumno', async () => {
        it('it should PUT a alumno by the given id', (done) => {
            const alumno = new Alumno({ "nombreAlumno": "Cristian", "cedulaAlumno": 190220, "telefonoAlumno": "7461304325", "correoAlumno": "nochebuenacristian048@gmail.com", "cursoId": 1, "profesorId": 1 });
            alumno.save((err, alumno) => {
                chai.request(app)
                    .put('/alumno/update/:id/curso/:id/profesor/:id/alumno' + alumno.cursoId + alumno.profesorId + alumno.id)
                    .send(alumno)
                    .end((err, response) => {
                        if (err) {
                            expect(response).to.have.status(500);
                            expect(response.body).to.have.property('message').that.is.equal(err);
                            done(err);
                        } else {
                            expect(response).to.have.status(202);
                            expect(response.body).to.be.an('object');
                            done();
                        }
                    });
            });
            done();
        });
    });

    describe('Test DELETE route /alumno/delete/:id', async () => {
        it('it should DELETE a alumno given the id', async (done) => {
            const alumno = new Alumno({ "nombreAlumno": "Cristian", "cedulaAlumno": 190220, "telefonoAlumno": "7461304325", "correoAlumno": "nochebuenacristian048@gmail.com", "cursoId": 1, "profesorId": 1 });
            alumno.save((err, alumno) => {
                chai.request(app)
                    .delete('/alumno/delete/.id' + alumno.id)
                    .end((err, response) => {
                        if (err) {
                            expect(response).to.have.status(500);
                            expect(response.body).to.have.property('message').that.is.equal(err);
                        } else {
                            expect(response).to.have.status(204);
                            expect(response.body).to.be.an('object');
                        }
                    });
            });
            done();
        });
    });

});
