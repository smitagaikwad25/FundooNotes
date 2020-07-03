const USER_SERVICE = require("../service/user.service")
const bcrypt = require('bcrypt');

const VERIFY = require("../utility/varification")

exports.userRegister = (req, res) => {
    try {
        var response = {};
        USER_SERVICE.isUserPresent({ emailID: req.body.emailID }, (err, data) => {
            if (data) {
                response.success = false;
                response.message = "user with this mail id already present";
                return res.status(500).send(response);
            } else {
                req.checkBody("firstName")
                    .isAlpha().withMessage('first name is not in proper formate')
                    .isLength({ min: 4 }).withMessage('first name should have min 4 characters')
                    .exists();
                req.checkBody("lastName")
                    .isAlpha().withMessage('last name is not in proper formate')
                    .isLength({ min: 4 }).withMessage('last name should have min 4 characters')
                    .exists();
                req.checkBody("emailID")
                    .exists()
                    .isEmail();
                req.checkBody("password")
                    // .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,}$/)
                    // .withMessage('must be at least 8 chars long and must and min one lower and uper case chars aslo only one special chars ')
                    .exists();

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
                            let payload =
                            {
                                "emailID": data.emailID,
                                "_id": data._id
                            }
                            let Token = VERIFY.generateToken(payload)
                            console.log("jwttokent--->", Token);
                            response.data = data;
                            response.success = true;
                            response.message = "user registertion successfull done";
                            return res.status(200).send(response);
                        }
                    })
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal erro occure" });
    }
}

exports.userLogin = (req, res) => {
    try {
        req.checkBody("emailID")
            .exists()
            .isEmail();
        req.checkBody("password")
            .exists();
        const error = req.validationErrors();
        const response = {};
        if (error) {
            response.success = false;
            response.message = 'enter valid details';
            response.error = error;
            return res.status(500).send(response);
        } else {
            loginData = {
                emailID: req.body.emailID,
            }
            USER_SERVICE.userLogin(loginData, (err, data) => {
                if (err) {
                    response.success = false;
                    response.message = 'no user exit with this email id';
                    response.err = err;
                    return res.status(500).send(response);
                }
                VERIFY.isPasswordCorrect(req.body.password, data, (err, data) => {
                    if (err) {
                        response.success = false;
                        response.message = "Invalid password";
                        response.err = err;
                        return res.status(500).send(response);
                    } else {
                        response.data = data;
                        response.success = true;
                        response.message = "user login successfull done";
                        return res.status(200).send(response);
                    }
                })
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal erro occure" });
    }
}

exports.userUpdate = (req, res) => {
    try {
        const response = {};
        USER_SERVICE.isUserPresent({ emailID: req.body.emailID }, (err, data) => {
            if (!data) {
                response.success = false;
                response.message = "user with this mail id doesn't exist";
                return res.status(500).send(response);
            } else {
                USER_SERVICE.userUpdate(req, (err, data) => {
                    if (err) {
                        response.success = false;
                        response.message = 'erro occurre while updating';
                        response.err = err;
                        return res.status(500).send(response);
                    } else {
                        response.data = data
                        response.success = true;
                        response.message = 'user information update successfully done'
                        return res.status(200).send(response)
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal erro occure" });
    }

};

exports.deleteUser = (req, res) => {
    try {
        const response = {};
        USER_SERVICE.deleteUser(req, (err, data) => {
            if (err) {
                response.success = false;
                response.message = 'erro occurre while delete';
                response.err = err;
                return res.status(500).send(response);
            } else {
                response.data = data
                response.success = true;
                response.message = 'successfully deleted user'
                return res.status(200).send(response)
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal erro occure" });
    }

}