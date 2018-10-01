const express = require('express');
const middleware = require('./verifyToken');
const authController = require('./auth.controller');

let router = express.Router()
const usersController = require('./users.controller');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/all', usersController.fetchAll);
router.get('/one/:id', usersController.fetchSelectedUser);
 
router.delete('/delete/:id', usersController.deleteSelectedUser);

module.exports = router;