const mysql = require('mysql');

// DB connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // maximum number of connections to create at once
    host: "localhost",
    user: "root",
    password: "",
    database: "database",
});

pool.getConnection(function (err) {
    if (err){
        console.log("Connection Failed")
    } else{
        console.log("Connected Successfully")
    }
   })

// Export the pool instead of the connection object
module.exports = pool;
