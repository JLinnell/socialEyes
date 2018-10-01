const userModel = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    //check if there is data on the req.body
    if (!req.body.email || !req.body.password) {
        res.status(404).json({
            message: `email and password are required`
        });
        return;
    }
    //check if user exists
    userModel.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                res.status(404).json({
                    message: `the user ${req.body.email} already exists`
                });
                return;
            }
            //create user model
            let newUser = new userModel();
            newUser.email = req.body.email;
            newUser.name = req.body.name;

            //encrypt password
            bcrypt.hash(req.body.password, 10)
                .then((encrypted) => {
                    //save user and send respoonse
                    newUser.password = encrypted;
                    newUser.save()
                        .then((result) => {
                            res.status(200).json({
                                message: "new user saved successfully!",
                                data: result
                            })
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message: "Something happened!",
                                data: err
                            })
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: `Something has happened with the password!`
                    });
                })

        })
        .catch((err) => {
            res.status(500).json({
                message: `Something has happened fetching the user!`
            });
        })


}

exports.login = (req, res) => {
    //check if there is data on the req.body
    if (!req.body.email || !req.body.password) {
        res.status(404).json({
            message: `email and password are required`
        });
        return;
    }
    //check if user exists
    userModel.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: `the user ${req.body.email} does not exist`
                });
                return;
            }
            //check if password matches
            const passwordMatches = bcrypt.compareSync(req.body.password, user.password)
            if (!passwordMatches) {
                res.status(401).json({
                    message: `the password doesn't match!`
                });
                return;
            }
            //generate token and response if password matches
            let userToken = {
                email: user.email,
                id: user._id
            };
            token = jwt.sign(userToken, "i love Jon's cat!!! meow!!")
            res.status(200).json ({
                message: "Logged in successfully!",
                data: {
                    email: user.email,
                    id: user._id,
                    token: token
                }
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `Something has happened fetching the user!`
            });
        })


}