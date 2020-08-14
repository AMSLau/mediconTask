const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const session = require("express-session");
const jwt = require("jsonwebtoken");
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
//database connection
const mysql = require("mysql");
var db = mysql.createConnection({
  host: "remotemysql.com",
  user: "70uHXT28z8",
  password: "AnKIPcCiJO",
  database: "70uHXT28z8",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//ping pong testing
app.get("/ping", function (req, res) {
  return res.send("pong");
});

//display all
var sql = "SELECT * FROM clinicAccount";
//display home page
app.get("/", function (req, res) {
  //QUERY request
  if (req.session.loggedin) {
    console.log("display ");
    console.log("display clinic record :");
    db.query(
      "SELECT recordID,doctor_name,patient_name,diagnosis,DATE_FORMAT(dateTime, '%Y-%m-%d') Date FROM clinicRecord WHERE clinicID = ?",
      [req.session.clinicID],
      function (error, result, fields) {
        if (error) throw error;
        console.log(
          "200 : Displaying Record List \n Data : \n" + JSON.stringify(result)
        );
        res.send(
          "Welcome , " +
            req.session.name +
            "! \n Clinic ID is " +
            req.session.clinicID +
            "Clinic Record List:" +
            JSON.stringify(result)
        );
      }
    );
  } else {
    db.query(sql, function (error, result, fields) {
      if (error) throw error;
      var resjson = JSON.parse(JSON.stringify(result));
      console.log("200 : pong ");
      res.send("hello world : result " + JSON.stringify(result));
    });
  }
});

//token generator
function generateAccessToken(email) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(email, "" + process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}
//login authen
app.post("/auth", function (request, response) {
  var email = request.body.email;
  var password = request.body.password;
  if (email && password) {
    db.query(
      "SELECT * FROM clinicAccount WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.email = email;
          request.session.name = results[0].name;
          request.session.clinicID = results[0].id;
          console.log(
            "200 : User " +
              email +
              " logged in! \n Clinic : " +
              request.session.name
          );
          const token = generateAccessToken({ email: request.session.email });
          response.json(token);
          console.log(
            "Welcome to " +
              request.session.name +
              "\n ID : " +
              request.session.clinicID
          );
          console.log("redirect to home page!");
          //response.redirect("/");
        } else {
          response.send("400 : Incorrect Email and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("400 : Please enter Email and Password!");
    response.end();
  }
});

//account create
app.post("/signup", function (request, response) {
  var email = request.body.email;
  var password = request.body.password;
  var name = request.body.name;
  var phone = request.body.phone;
  var address = request.body.address;

  if (email && password) {
    db.query(
      "INSERT INTO clinicAccount (`email`,  `password`, `name`, `phone`, `address` ) VALUES ('?', '?','?', '?','?')",
      [email, password, name, phone, address],
      function (error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.email = email;
          console.log("200 : Sign up success");
          var token = response.send("Sign up successfully!");
          response.redirect("/home");
        } else {
          response.send("400 : Incorrect Email and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("400 : Please enter correct information");
    response.end();
  }
});

//Clinic logged in
//1. login then display list
//display all

//1. display record detail
app.get("/record/", function (req, res) {
  //QUERY request
  if (req.session.loggedin) {
    var record_id = req.body.record_id;
    db.query(
      "SELECT `doctor_name`, `patient_name`, `diagnosis`, `medication`, `consultation_fee`,DATE_FORMAT(dateTime, '%Y-%m-%d') Date, DATE_FORMAT(dateTime,'%H:%i:%s') Time, `follow-up` FROM clinicRecord WHERE recordID = ? AND clinicID = ?",
      [record_id, req.session.clinicID],
      function (error, result, fields) {
        if (error) throw error;
        var resjson = JSON.parse(JSON.stringify(result));
        console.log("200 : Browsing Record Detail Request Success !");
        console.log("Data: " + JSON.stringify(result));

        res.send("Clinic Record Details : " + JSON.stringify(result));
      }
    );
  } else {
    console.log("400 : Browsing Record Detail Request Failed : Please login");
    res.end();
  }
});
//2. Create record
app.post("/create", function (request, response) {
  var docName = request.body.doctor_name;
  var patientName = request.body.patient_name;
  var diagnosis = request.body.diagnosis;
  var medication = request.body.medication;
  var consultation_fee = request.body.consultation_fee;
  var requireFollowUp = request.body.requireFollowUp;
  if (req.session.loggedin) {
    db.query(
      "INSERT INTO `clinicRecord` (`clinicID`, `doctor_name`, `patient_name`, `diagnosis`, `medication`,`consultation_fee`, `dateTime`, `follow-up`) VALUES ( ?, ? ,?,?, ?, ?, NOW(), ?)",
      [
        request.session.clinicID,
        docName,
        patientName,
        diagnosis,
        medication,
        consultation_fee,
        requireFollowUp,
      ],
      function (error, results, fields) {
        if (results.length > 0) {
          console.log("200 : Creating Record Request Success !");
          response.send("Record created");
          response.redirect("/");
        } else {
          response.send("400 : Incorrect Information!");
        }
        response.end();
      }
    );
  } else {
    response.send("400 : Please enter correct information");
    response.end();
  }
});
app.listen(process.env.PORT || 5000);
