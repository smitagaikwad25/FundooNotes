const MONGOOSE = require("mongoose");

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