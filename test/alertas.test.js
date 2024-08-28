const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('Alertas API', () => {
    it('Debe devolver proyectos que estén a menos de una semana de su fecha de entrega', (done) => {
        chai.request(app)
            .get('/alertas')
            .end((err, res) => {
                expect(res).to.have.status(200);
                if (Array.isArray(res.body)) {
                    res.body.forEach(proyecto => {
                        expect(proyecto).to.have.property('id');
                        expect(proyecto).to.have.property('nombre');
                        expect(proyecto).to.have.property('descripcion');
                        expect(proyecto).to.have.property('fechaInicio');
                        expect(proyecto).to.have.property('fechaFin');
                        expect(proyecto).to.have.property('porcentajeCompletado');

                        const daysLeft = (new Date(proyecto.fechaFin) - new Date()) / (1000 * 60 * 60 * 24);
                        expect(daysLeft).to.be.within(0, 7);
                    });
                } else {
                    expect(res.body).to.have.property('message').eql('No hay proyectos próximos a vencer.');
                }
                done();
            });
    });

    it('Debe devolver un mensaje si no hay proyectos próximos a vencer', (done) => {
        chai.request(app)
            .get('/alertas')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('No hay proyectos próximos a vencer.');
                done();
            });
    });

    it('Debe devolver una alerta específica por ID', (done) => {
        const alertId = 1; // Cambia esto por un ID válido que exista en tu base de datos
        chai.request(app)
            .get(`/alertas/${alertId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                if (res.body.message) {
                    expect(res.body).to.have.property('message').eql('Proyecto no encontrado');
                } else {
                    expect(res.body).to.have.property('id').eql(alertId);
                    expect(res.body).to.have.property('nombre');
                    expect(res.body).to.have.property('descripcion');
                    expect(res.body).to.have.property('fechaInicio');
                    expect(res.body).to.have.property('fechaFin');
                    expect(res.body).to.have.property('porcentajeCompletado');
                }
                done();
            });
    });
});
