//imports of dependecies
const express = require("express");
const expressHandlebars = require("express-handlebars");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//static files
app.use(express.static("public"));

//template engine
const handlebars = expressHandlebars.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

//Connection Pool
const pool = mysql.createPool({
    connectionLimit:100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PAS
})

pool.getConnection((err,connection) => {
    if(err) throw err; //not connected
    console.log(`Connected ID: ${connection.threadId}`);
})

//Middleware
app.use(express.urlencoded({extended:true}));

//parse application/json
app.use(express.json());

const router = require("./server/routes/user");
app.use("/", router);

// plug on server
app.listen(port, () => console.log(`listening on port ${port}`));