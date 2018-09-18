const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    //Get the token from the headers or the parameter token
    // const token = req.headers.authorization || req.params.token;
    const token = req.body.authorization || req.params.token;
    //Check if I have something
    if (!token) {
        //If we get to this line of code, it means that we have some token
        //jwt.verify will validate the token
        jwt.verify(token, "i love Jon's cat!!! meow!!", (error, decode) => {
            if (error) {
                res.status(500).json({
                    message: "Token is not valid"
                });
                return;
            }

            //What I do is save the user object (the token decoded) in the request
            // decode will be {email, id}
            //I save it in the requests because all the middleware share the same req and res
            req.user = decode;

            //Will go to the next function
            next();
        });
    }
};