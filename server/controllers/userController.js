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
                let removed = req.query.removed;
                res.render("home", {data, alert: removed});
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

// View user detailed information
exports.viewdetailed = (req,res) => {
    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, user) => {
            if (!err) {
              res.render('viewUser', { user});
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n');
        });
    })
}

//Creating a new user
exports.add = (req,res) => {
    res.render("addUser");
    console.log("Macacos me mordam");
}

//Insert a new user on database
exports.insert = (req,res) => {
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

// Edit user
exports.edit = (req,res) => {
    pool.getConnection((err, connection) => {
        connection.release();

        connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err,user) => {
            if(!err) {
                res.render("editUser", {user});
            } else console.log(err);

            console.log("the user that will update is ", user);
        })
    })
}

// Update User
exports.update = (req, res) => {
    pool.getConnection((err, connection) => {
        const { first_name, last_name, email, phone, comments } = req.body;
        // User the connection
        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, user) => {
      
          if (!err) {
            // User the connection
            connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, user) => {
              // When done with the connection, release it
              
              if (!err) {
                res.render('editUser', { user, alert: `${first_name} has been updated.` });
              } else {
                console.log(err);
              }
              console.log('The data from user table: \n', user);
            });
          } else {
            console.log(err);
          }
          console.log('The data from user table: \n', user);
        });
    })
}

//Deleting a existing user
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, user) => {
            connection.release();
      
            if(!err) {
                let removedUser = encodeURIComponent(`user sucessfully removed`);
                res.redirect('/?removed=' + removedUser);
            } else {
                console.log(err);
            }
            
            console.log('The data from user table: \n', user);
      
        });
    })
}