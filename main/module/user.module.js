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

var SCHEMA_USER_DETAIL = MONGOOSE.model("userDetails", USERSCHEMA);

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

exports.isUserPresent = (emailID, callback) => {

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

};

exports.userUpdate = (req, callback) => {

    const id = req.params.id
    const updates = req.body

    SCHEMA_USER_DETAIL.findByIdAndUpdate(id, updates, { new: true })
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