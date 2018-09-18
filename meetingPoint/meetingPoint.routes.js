const express = require('express');

let router = express.Router()
const meetingPointController = require('./meetingPoint.controller');
const middleware = require('../users/middleware');
//create:post that sends all info in the body for creating a new meeting point (using the model)
router.post('/create/:token', middleware.verifyToken, meetingPointController.createNew);
//all: get that fetches all meeting points from all the users
router.get('/all/:token', middleware.verifyToken, meetingPointController.fetchAll);
//one/:id: get that takes id as parameter an fetches one meeting point
router.get('/one/:id', meetingPointController.fetchSelectedPoint);
//all/:userId: [not now] get that fetches all meeting points from a user
router.get('/fetchAllByUser/:id/:token', middleware.verifyToken, meetingPointController.fetchAllByUser);
//delete/:id: delete removes the selected meeting point from the database
router.delete('/delete/:id', meetingPointController.deleteSelectedPoint);

router.get('/findByTitle/:searchQueryText', meetingPointController.findByCategory);

module.exports = router;