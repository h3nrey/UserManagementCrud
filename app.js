//imports of dependecies
const express = require("express");
const expressHandlebars = require("express-handlebars");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//static files
app.use(express.static("public"));

//template engine
const handlebars = expressHandlebars.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

//middleware
app.use(express.urlencoded({extended:true}));

//parse application/json
app.use(express.json());

//Router
app.get("/", (req,res) => {
    res.render("home");
})

// plug on server
app.listen(port, () => console.log(`listening on port ${port}`));