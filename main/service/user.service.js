const USER_LOGIN_MODULE = require("../module/user.module")

exports.registerUser = (data, callback) => {

    USER_LOGIN_MODULE.registerUser(data, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });

};

exports.isEmailPresent = (data, callback) => {
    USER_LOGIN_MODULE.isEmailIDPresent(data, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
};

exports.userLogin = (data, callback) => {
    USER_LOGIN_MODULE.userLogin(data, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
};