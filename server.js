const fs = require("fs");
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// let storedInfo = [];

//the routes that will render notes 

app.get("/notes", function (req, res) {
    res.sendFile(path.join(_dirname, "public/notes.html"));
});

// when the data is collected it will end up as db.json here

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(_dirname, "db/db.json"))
});


// use POST method to add a note

app.post("/api/notes", async (req, res) => {
    let newNote = req.body;
    let dbLocation = path.join(_dirname, "db/db.json");
    fs.readFile(dbLocation, "utf8", function (err, data) {
        if (err) throw err;
        let oldData = JSON.parse(data);
        newNote.id = oldData.length + newNote.title;
        oldData.push(newNote);
        let update = JSON.stringify(oldData);
        fs.writeFile(dbLocation, update, function (err) {
            if (err) throw err;
        });
        res.sendFile(path.join(_dirname, "public/notes.html"));
    });
});

// use DELETE method to be able to delete note 
app.delete("api/notes/:id", function (req,res) {
    let noteIndex = re
});


//render everything on the main page and makes sure get request is working 

app.get("*", function (req, res) {
    res.sendfile(path.join(_dirname, "public/index.html"));
});

//This is where the server will commence 
app.listen(PORT, function() {
    console.log("App listening on PORT: ", PORT);
});