const fs = require("fs");
const express = require("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));


//the routes that will render notes 

app.get("/notes", function (req, res) {
    res.sendFile(path.join(_dirname, "public/notes.html"));
});


// when the data is collected it will end up as db.json here

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});


// use POST method to add a note

app.post("/api/notes",)

//render everything on the main page
