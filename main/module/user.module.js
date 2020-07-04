const MONGOOSE = require("mongoose");
MONGOOSE.set('useFindAndModify', false);

const USERSCHEMA = MONGOOSE.Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        emailID: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
);

var SCHEMA_USER_DETAIL = MONGOOSE.model("registerdatas", USERSCHEMA);

exports.registerUser = (UserData, callback) => {

    const USERDATA = new SCHEMA_USER_DETAIL();
    USERDATA.firstName = UserData.firstName;
    USERDATA.lastName = UserData.lastName;
    USERDATA.emailID = UserData.emailID;
    USERDATA.password = UserData.password;

    USERDATA.save()
        .then(data => {
            callback(null, data);
        })
        .catch(err => {
            callback({ message: "Error While Storing User Details in DataBase" }, null);
        })
};

exports.isPresent = (emailID, callback) => {

    SCHEMA_USER_DETAIL.findOne({ "emailID": emailID.emailID }, (err, data) => {

        if (err) {
            return callback(err, null)
        } else {
            return callback(null, data)
        }
    })
};

exports.userLogin = (data, callback) => {

    SCHEMA_USER_DETAIL.findOne(data)
        .then(data => {
            callback(null, data);
        })
        .catch(err => {
            callback({ message: "Invalid email id" })
        });

}

exports.userUpdate = (req, callback) => {

    const emailID = req.params.emailID
    const updates = req.body

    SCHEMA_USER_DETAIL.findByIdAndUpdate(emailID, updates, { new: true })
        .then(data => {
            if (!data) {
                callback({ message: "no data found with this id" })
            }
            callback(null, data);
        })
        .catch(err => {
            callback({ message: "Invalid email id" })
        });
}

exports.deleteUser = (req, callback) => {

    const emailID = req.params.emailID

    SCHEMA_USER_DETAIL.findByIdAndRemove(emailID)
        .then(data => {
            if (!data) {
                callback(null, { message: "no data found with this id" })
            } else {
                callback(null, { message: "user was deleted successfully" });
            }
        })
        .catch(err => {
            callback({ message: "error occure" })
        });

}

exports.searchUser = (userData, callback) => {

    SCHEMA_USER_DETAIL.find(
        { emailID: { $regex: userData.emailID, $options: "i" } },
        (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, data);
            }
        }
    );

}
