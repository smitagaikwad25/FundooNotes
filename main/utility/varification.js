exports.generateToken = (payload) => {
    var token = jwt.sign({ payload }, 'privatekey');
    let TokenObject = {
        token: token,
        sucess: true
    }
    return TokenObject
};

exports.isPasswordCorrect = (password, data, callback) => {
    bcrypt.compare(password, data.password, (err, res) => {
        if (!res) {
            return callback({ message: "Incorrect Password" })
        } else {
            return callback(null, "Loging successfully done")
        }
    });
};

