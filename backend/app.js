require("dotenv").config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT; //PORT at .env file
const app = express();

//JSON && form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Solve CORS
app.use(cors({credential: true, origin: "http://localhost:3000"}));

/*
Upload directory
app.use("/uploads", express.static(path.join(_dirname, "/uploads")));
*/

//DB connection
require("./config/db");

//Routes
const routes = require("./routes/router");

app.use(router);

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`)
});










