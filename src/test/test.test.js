/* Durante la prueba, la variable env se establece en prueba */
process.env.NODE_ENV = '.env';

/* Requerir las dependencias de desarrollo */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from "../../server.js";
import { Curso } from "../models/curso.model.js";
import { response } from "express";


/* Afirmación */
chai.should();
chai.use(chaiHttp);

describe('Task APIs', () => {
    describe('Test GET route /cursos', () => {
        it('It should return all cursos', (done) => {
            chai.request(app)
                .get("/cursos/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });

        it('It should NOT return all cursos', (done) => {
            chai.request(app)
                .get("/cursos/")
                .end((err, response) => {
                    response.should.have.status(500);
                    done();
                });
        });
    });
});

