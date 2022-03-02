const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const Port = 5000;

//use middleware
app.use(cors());
app.use(express.json());

//db credentials
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users-info",
});

//connect to db
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("mysql database connected");
});


app.get('/', (req, res) => {
    res.json({
        Message:'Hello My World'
    })
})

// get all users
app.get("/api/all-users", (req, res) => {
    const sqlSelect =
      "SELECT * FROM users";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });


  app.listen(process.env.PORT || Port, () => {
    console.log(`sever running on http://localhost:${Port}`);
  });