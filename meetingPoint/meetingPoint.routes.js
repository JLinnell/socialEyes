const express = require('express');

let router = express.Router()
const meetingPointController = require('./meetingPoint.controller');
const middleware = require('../users/middleware');

router.post('/create/:token', middleware.verifyToken, meetingPointController.createNew);
router.get('/all/:token', middleware.verifyToken, meetingPointController.fetchAll);
router.get('/one/:id', meetingPointController.fetchSelectedPoint);
router.get('/fetchAllByUser/:id/:token', middleware.verifyToken, meetingPointController.fetchAllByUser);
router.delete('/delete/:id', meetingPointController.deleteSelectedPoint);

router.get('/findByCategory/:searchQueryText', meetingPointController.findByCategory);
router.get('/findByLocation/:searchQueryText', meetingPointController.findByLocation);

module.exports = router;