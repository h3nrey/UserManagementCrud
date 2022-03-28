const express = require("express");
const { createPool } = require("mysql");

const pool = createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

exports.view = (req,res) =>{
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log("Connected ad ID: " + connection.threadId);

        connection.query("SELECT * FROM user", (err, data) => {
            connection.release();
            if(!err) {
                res.render("home", {data});
            } else {
                res.render("home", {data:null});
            }

            console.log("the data of database is \n", data)
        })
    })   
}

// Finding  a user
exports.find = (req,res) => {
    pool.getConnection((err, connection) => {
        
        let query = req.body.search;
        
        connection.query("SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?", ["%" + query + "%", "%" + query + "%"], (err,data) => {
            connection.release();
            if(!err) {
                res.render("home", {data})
            } else{
                res.render("home", {data:null})
            }
            console.log("the data of database is \n", data)
        })
    })
}

//Creating a new user
exports.addUser = (req,res) => {
    res.render("addUser");
}

//Insert a new user on database
exports.insertUser = (req,res) => {
    const  {first_name, last_name, email, phone, comments} = req.body;

    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query("INSERT INTO user SET first_name = ?, last_name = ?, email = ?, comments = ?, phone = ?", [first_name, last_name, email, comments, phone], (err, user) => {
            connection.release();

            if(!err) {
                res.render("addUser", {alert:"User added successfully"});
            } else {
                console.log(err);
            }

            console.log("The new user has this informations: \n", user);
        })
    })
}

