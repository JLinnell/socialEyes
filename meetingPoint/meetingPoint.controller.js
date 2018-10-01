const meetingPointModel = require('./meetingPoint.model');

exports.createNew = (req, res) => {


    var newMeetingPoint = meetingPointModel({
        address: req.body.address,
        category: req.body.category,
        description: req.body.description,
        title: req.body.title,
        userId: req.body.userId
    });
   
    newMeetingPoint.save()
        .then((result) => {
            res.status(200).json({
                message: "meeting point saved successfully!",
                data: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}

exports.fetchAll = (req, res) => {
    meetingPointModel.find()
        .then((meetingPoint) => {
            res.status(200).json({
                message: "meeting points fetched successfully!",
                data: meetingPoint
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}

exports.fetchSelectedPoint = (req, res) => {
    meetingPointModel.findById(req.params.id)
        .then((meetingPoint) => {
            res.status(200).json({
                message: "selected meeting point fetched successfully!",
                data: meetingPoint
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}

exports.deleteSelectedPoint = (req, res) => {
    meetingPointModel.findByIdAndRemove(req.params.id)
    .then((meetingPoint) => {
        res.status(200).json({
            message: "meeting point deleted successfully!",
            data: meetingPoint
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "Something happened!",
            data: err
        })
    })
}

exports.findByCategory = (req, res) => {
    console.log(req.params.searchQueryText);
    meetingPointModel.find({category:  new RegExp(req.params.searchQueryText, "i")})
        .then((meetingPoint) => {
            res.status(200).json({
                message: "Search query fetched successfully!",
                data: meetingPoint
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}

exports.fetchAllByUser = (req, res) => {
    meetingPointModel.find({userId: req.params.id})
        .then((meetingPoint) => {
            res.status(200).json({
                message: "meeting points fetched successfully!",
                data: meetingPoint
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}
