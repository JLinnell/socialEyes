const usersModel = require('./users.model');

exports.createNew = (req, res) => {

    //create new meeting point
    var newUser = usersModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    console.log("here I am!");
    //save user in database
    newUser.save()
        .then((result) => {
            res.status(200).json({
                message: "User saved successfully!",
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
    usersModel.find()
        .then((users) => {
            res.status(200).json({
                message: "Users fetched successfully!",
                data: users
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}

exports.fetchSelectedUser = (req, res) => {
    usersModel.findById(req.params.id)
        .then((user) => {
            res.status(200).json({
                message: "Selected user fetched successfully!",
                data: user
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}

exports.deleteSelectedUser = (req, res) => {
    usersModel.findByIdAndRemove(req.params.id)
    .then((user) => {
        res.status(200).json({
            message: "User deleted successfully!",
            data: user
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "Something happened!",
            data: err
        })
    })
}