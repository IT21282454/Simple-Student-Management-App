// import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// create app
const app = express();

// create port
const PORT = process.env.PORT || 8070;

// create middleware
app.use(cors());
app.use(bodyParser.json());

// routers
const studentRoute = require("./routes/student_route")

app.use("/student", studentRoute)

// db
const URL = process.env.MONGODB_URL;

mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connection success!")
    })
    .catch((err) => {
        console.error(`Database is not connectd : ${err}`)
    });


// listen port
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})