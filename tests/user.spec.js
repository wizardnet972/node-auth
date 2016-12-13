const server = require('../www');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJWT = require('chai-jwt');
const should = chai.should();

chai.use(chaiHttp);
chai.use(chaiJWT);

describe('a suite test for user route', function() {
    var token = { admin: null, user: null };

    it('should return 200', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
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

    it('should login a user', (done) => {
        const credentials = {
            email: 'user@gmail.com',
            password: 'user'
        }

        const expectedUserName = 'user';

        chai.request(server)
            .post('/api/login')
            .send(credentials)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token').to.be.a.jwt;
                res.body.should.have.property('user').be.a('object');
                res.body.user.should.have.property('id').not.to.be.null;
                res.body.user.should.have.property('name').that.equals(expectedUserName);
                token.user = res.body.token;
                done();
            });
    });

    it('should GET a user by given token', (done) => {

        chai.request(server)
            .get('/api/user')
            .set('x-access-token', token.user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user').be.a('object');
                res.body.user.should.have.property('name').not.to.be.null;
                done();
            });
    });

    it('should UPDATE a user by given token', (done) => {

        const details = {
            email: 'modifyemailforuser@gmail.com',
            name: 'change username',
            bio: 'change bio for user',
            age: 31,
            // server should know how to ignore from changing those fields:
            id: 'invalid-id',
            password: 'invalid password.',
            createdAt: 'NOW'
        }

        chai.request(server)
            .put('/api/user')
            .set('x-access-token', token.user)
            .send(details)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user').be.a('object');
                res.body.user.should.have.property('id').that.not.equals(details.id);
                res.body.user.should.have.property('name').that.equals(details.name);
                res.body.user.should.have.property('bio').that.equals(details.bio);
                res.body.user.should.have.property('createdAt').that.not.equals(details.createdAt);
                done();
            });
    });

    xit('should GET all users by given token', (done) => {

        chai.request(server)
            .get('/api/users')
            .set('x-access-token', token.user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    xit('should DELETE a user by given token', (done) => {
        const userId = 90;

        chai.request(server)
            .get('/api/users')
            .set('x-access-token', token.user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    xit('should DELETE all users by given token', (done) => {
        const userId = 90;

        chai.request(server)
            .get('/api/users')
            .set('x-access-token', token.user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});


