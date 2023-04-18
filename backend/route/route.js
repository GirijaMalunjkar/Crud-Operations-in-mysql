var express = require('express');
var route = express.Router();

const pool = require('../models/database');

// var db = require('../models/database');

route.get("/user", (req, res) => {
    var sql = "SELECT * FROM  user";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

route.get("/user/:id", (req, res) => {
    var userid = req.params.id;
    var sql = "SELECT FROM * user WHERE id=" + userid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

route.put("/user/:id", (req, res) => {
    let sql =
        "UPDATE user SET name='" +
        req.body.name +
        "', email= '" +
        req.body.email +
        "', pass= '" +
        req.body.pass +
        "' WHere id=" +
        req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "User Update Failed"
            });
        } else {
            res.send({
                status: true, message: "User Update Successfully"
            });
        }
    });
});

route.delete("/user/:id", (req, res) => {
    let sql = "DELETE FROM user WHERE id=" + req.params.id + "";
    let query = pool.query(sql, (error) => {
        if (error) {
            res.send({
                status: false, message: "User Deleted Failed"
            });
        } else {
            res.send({
                status: true, message: "User Deleted Successfully"
            });
        }
    });
});
route.post('/registration', (req, res) => {
    let details = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
    };
    let sql = "INSERT INTO user SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "User Created Fail" });
        } else {
            res.send({ status: true, message: "User Created Successfully" });
        }
    })
});

route.post('/userLogin', (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM user WHERE email = ? AND pass = ?', [email, password], (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        // If the credentials are correct, return the user information
        res.send(results[0]);
      } else {
        // If the credentials are incorrect, return an error message
        res.status(401).send({ message: 'Invalid email or password' });
      }
    });
  });

module.exports = route;