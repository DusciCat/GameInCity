//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));


//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    // res.render("index");
    res.sendFile( __dirname + "/public/" + "index.html" );
});

//render the ejs and display added task, completed task
app.get("/cityIds", function(req, res) {
    res.send([{id: "198100709"}]);
});


app.listen(3000, function() {
    console.log("server is running on port 3000");
});