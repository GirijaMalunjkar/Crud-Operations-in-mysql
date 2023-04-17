//import libraries
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { error } = require('console');

var app = express();
app.use(express.json());

//MiddleWares
app.use(cors());
app.use(bodyparser.json());

//Server Connection
const port = 8080;

app.listen(port, () => {
    console.log('Server Start At Port :' + port)
});

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//DB connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    pass: "",
    database: "database",
});

db.connect(function (error) {
    if (error) {
        console.log("Error Connecting to DB");
    } else {
        console.log("DB Connected Successfully");
    }
});

//API
app.post('/api/user', (req, res) => {
    let details = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
    };
    let sql = "INSERT INTO user SET ?";
    db.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "User Created Fail" });
        } else {
            res.send({ status: true, message: "User Created Successfully" });
        }
    })
});

app.get("/api/user/", (req, res) => {
    var sql = "SELECT * FROM  user";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

app.get("api/user/:id", (req, res) => {
    var userid = req.params.id;
    var sql = "SELECT FROM * user WHERE id=" + userid;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

app.put("/api/user/:id", (req, res) => {
    let sql =
        "UPDATE user SET name='" +
        req.body.name +
        "', email= '" +
        req.body.email +
        "', pass= '" +
        req.body.pass +
        "' WHere id=" +
        req.params.id;

    let query = db.query(sql, (error, result) => {
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

app.get("api/user/:id", (req, res) => {
    let sql = "DELETE FROM * user WHERE id=" + req.params.id;
    let query = db.query(sql, (error) => {
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

app.post('/api/userLogin', function (req, res) {

    var email = req.body.email;

    var pass = req.body.pass;

    if (email && pass) {
        query = `
        SELECT * FROM user
        WHERE email = "${email}"
        `;

        db.query(query, function (error, data) {
            console.log(error);
            if (data.length > 0) {
                for (var count = 0; count < data.length; count++) {
                    if (data[count].pass == pass) {
                        req.session.id = data[count].id;

                        res.redirect("/");
                    }
                    else {
                        res.send('Incorrect Password');
                    }
                }
            }
            else {
                res.send('Incorrect Email Address');
            }
            res.end();
        });
    }
    else {
        res.send('Please Enter Email Address and Password Details');
        res.end();
    }

});
