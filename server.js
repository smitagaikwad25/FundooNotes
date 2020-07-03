const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const app = express();

const expressValidator = require("express-validator");


require("dotenv").config();

app.use(expressValidator());

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("successfully contected to database");
    })
    .catch(err => {
        console.log("could not connect to the database . Exiting now...", err);
        process.exit();
    });

require("./src/routes/user.routes")(app);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});
