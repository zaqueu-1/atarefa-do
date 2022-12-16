const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

//Connection
const conn = async () => {
    try {
    const dbConn = await mongoose.connect(
        `mongodb+srv://${DB.USER}:${DB.PASS}@cluster0.38ftfev.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log("Connected to db!");

    return dbConn;
    } catch (err) {
        console.log(err);
    }
};