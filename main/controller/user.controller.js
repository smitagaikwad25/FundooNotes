const USER_SERVICE = require("../service/user.service")
const bcrypt = require('bcrypt');

exports.userRegister = (req, res) => {

    try {
        var response = {};

        req.checkBody("firstName").exists();
        req.checkBody("lastName").exists();
        req.checkBody("emailID").exists().isEmail();
        req.checkBody("password").exists();

        const error = req.validationErrors();

        if (error) {
            response.success = false;
            response.message = "enter valid details";
            response.error = error;
            return res.status(500).send(response);
        } else {

            userDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailID: req.body.emailID,
                password: bcrypt.hashSync(req.body.password, 10),
            };

            USER_SERVICE.registerUser(userDetails, (err, data) => {

                if (err) {
                    response.success = false;
                    response.message = "There was a problem registering the user";
                    response.err = err;
                    return res.status(500).send(response);
                } else {
                    response.data = data;
                    response.success = true;
                    response.message = "user registertion successfull done";
                    return res.status(200).send(response);
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal erro occure" });
    }
}