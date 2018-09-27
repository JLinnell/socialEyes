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

// This let's us make HTTP requests
// in our tests.
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

///////////////////////////////////////////////////////////////////////////////
///TO DO: make descirbe for user and put user its in that describe
//TO DO: check all criteria (link and upload to heroku)
describe('user', function () {
    before(function () {
        return runServer();
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
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
describe('meetingPoint', function () {
    before(function () {
        return runServer();
    });
    after(function () {
        tearDownDb();
        return closeServer();
    });
    it('should create one meeting point', function () {
        return chai.request(app)
            .post(`/meetingPoint/create/${token}`)
            .send({category: "tester", 
                title: "test", 
                userId: userId})
            .then(res => {
                expect(res).to.have.status(200);
            })
            .catch((error) => {
                console.log(error);
            });
    });
    it('should list meeting points on GET', function () {
        return chai.request(app)
            .get(`/meetingPoint/all/${token}`)
            .then(res => {
                expect(res).to.have.status(200);
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
/*res.should.be.json;
        res.body.should.be.a('array');
        // because we create three items on app load
        res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = ['id', 'name', 'checked'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });

  // test strategy:
  //  1. make a POST request with data for a new item
  //  2. inspect response object and prove it has right
  //  status code and that the returned object has an `id`
 /*it('should add a meeting point on POST', function() {
    // fill in later --> const newMeetingPoint = {key: 'value', key: 'value' };
    return chai.request(app)
      .post('/meetingPoint')
      .send(newItem)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('id', 'name', 'checked');
        res.body.id.should.not.be.null;
        // response should be deep equal to `newItem` from above if we assign
        // `id` to it from `res.body.id`
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
  });

  
  // test strategy:
  //  1. GET a shopping list items so we can get ID of one
  //  to delete.
  //  2. DELETE an item and ensure we get back a status 204
  it('should delete items on DELETE', function() {
    return chai.request(app)
      // first have to get so we have an `id` of item
      // to delete
      .get('/shopping-list')
      .then(function(res) {
        return chai.request(app)
          .delete(`/shopping-list/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });
});*/