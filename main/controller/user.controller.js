const USER_SERVICE = require("../service/user.service")
const bcrypt = require('bcrypt');

const VERIFY = require("../utility/varification")

exports.userRegister = (req, res) => {
    try {
        var response = {};
        USER_SERVICE.isEmailPresent({ emailID: req.body.emailID }, (err, data) => {
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
                    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,}$/)
                    .withMessage('must be at least 8 chars long and must and min one lower and uper case chars aslo only one special chars ')
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