const express = require('express');
const middleware = require('./verifyToken');
const authController = require('./auth.controller');

//const middleware = require('../controllers/middleware');
let router = express.Router()
const usersController = require('./users.controller');
//create:post that sends all info in the body for creating a new user (using the model)
router.post('/register', authController.register);
router.post('/login', authController.login);
//all: get that fetches all meeting points from all the users
router.get('/all', usersController.fetchAll);
//one/:id: get that takes id as parameter an fetches one meeting point
router.get('/one/:id', usersController.fetchSelectedUser);
//all/:userId: [not now] get that fetches all meeting points from a user
 
//delete/:id: delete removes the selected user from the database
router.delete('/delete/:id', usersController.deleteSelectedUser);

module.exports = router;