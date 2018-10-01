const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {
    app,
    runServer,
    closeServer
} = require('../server');

const meetingPoint = require('../meetingPoint/meetingPoint.model');
const user = require('../users/users.model');

chai.use(chaiHttp);
let token;
let userId;
let testUser = {
    email: "testUser1@testing.com",
    password: "testingpasswordddd"
}



function tearDownDb() {
    return new Promise((resolve, reject) => {
        mongoose.connection.dropDatabase().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

describe('user', function () {
    before(function () {
         runServer('mongodb://admin:adminadmin1ds117691.mlab.com:17691/hobbeettest');
    });
    after(function () {
        tearDownDb();
        return closeServer();
    });
    it('should create one user', function () {
        return chai.request(app)
            .post(`/users/register`)
            .send(testUser)
            .then(res => {
                userId = res.body.data._id;
                expect(res).to.have.status(200);
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });
    it('should log in one user', function () {
        return chai.request(app)
            .post(`/users/login`)
            .send(testUser)
            .then(res => {
                token = res.body.data.token;
                expect(res).to.have.status(200);
                done();
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
describe('meetingPoint', function () {
    before(function () {
        return runServer('mongodb://admin:adminadmin1ds117691.mlab.com:17691/hobbeettest');
    });
    after(function () {
        tearDownDb();
        return closeServer();
    });
    
    it('should list meeting points on GET', function () {
        return chai.request(app)
            .get(`/meetingPoint/all/${token}`)
            .then(res => {
                expect(res).to.have.status(200);
                done();
            })
            
            .catch((error) => {
                console.log(error);
            });
    });
});
