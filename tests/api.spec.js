const server = require('../www');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJWT = require('chai-jwt');
const should = chai.should();

chai.use(chaiHttp);
chai.use(chaiJWT);

describe('a suite test for api route', function() {
    var token = { admin: null, user: null };

    it('should return 200', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should have api route', (done) => {
        chai.request(server)
            .get('/api')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should signup a new user as admin', (done) => {
        const newAdmin = {
            email: 'wizardnet972@gmail.com',
            password: 'admin',
            name: 'adminy',
            age: '31',
            bio: 'This is the wiazrdnet972 admin bio',
            admin: true
        }

        chai.request(server)
            .post('/api/signup')
            .send(newAdmin)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('userId').be.a('string');
                done();
            });
    });

    it('should signup a new user', (done) => {
        const newUser = {
            email: 'user@gmail.com',
            password: 'user',
            name: 'user',
            bio: 'This is the user bio'
        }

        chai.request(server)
            .post('/api/signup')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('userId').be.a('string');
                done();
            });
    });
});
