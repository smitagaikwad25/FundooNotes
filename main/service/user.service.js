const USER_LOGIN_MODULE = require("../module/user.module")

exports.registerUser = (data, callback) => {

    USER_LOGIN_MODULE.registerUser(data, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });

};

exports.isPresent = (data, callback) => {
    USER_LOGIN_MODULE.isPresent(data, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
};

exports.userLogin = (data, callback) => {

    console.log("userloging data at service --->", data);

    USER_LOGIN_MODULE.userLogin(data, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
};

exports.userUpdate = (req, callback) => {

    console.log("user update data at service --->", req.body);

    USER_LOGIN_MODULE.userUpdate(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
}

exports.deleteUser = (req, callback) => {

    USER_LOGIN_MODULE.deleteUser(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    })
}

exports.searchUser = (req, callback) => {

    USER_LOGIN_MODULE.searchUser(req, (err, data) => {
        if (err) {
            return callback(err,null);
        }
        return callback(null, data);
    })
}
