const fs = require("fs");
const express = require("express");
const path = require("path");
const dbFile = require("./db/db.json")



const app = express();
const PORT = process.env.PORT || 9000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

let dataStored = [];

//the routes that will render notes 

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// when the data is collected it will end up as db.json here

app.get("/api/notes", function (req, res) {
        return res.json(dbFile);
  
});


// use POST method to add a note

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let newLocation = path.join(__dirname, "db/db.json");
    fs.readFile(newLocation, "utf8", function (err, data) {
        if (err) throw err;
        let oldData = JSON.parse(data);
        newNote.id = oldData.length + newNote.title;
        dbFile.push(newNote);
        let update = JSON.stringify(dbFile);
        fs.writeFile(newLocation, update, function (err) {
            if (err) throw err;
        });
        res.sendFile(path.join(__dirname, "public/notes.html"));
    });
});

// use DELETE method to be able to delete note 
app.delete("/api/notes/:id", function (req,res) {
    let newNote = req.params.id;
    console.log(newNote);
    let newLocation = path.join(__dirname, "db/db.json");
    fs.readFile(newLocation, "utf8", function (err, data) {
        if (err) throw err;
        dbFile.splice(newNote.id, 1);
        let update = JSON.stringify(dbFile);
        fs.writeFile(newLocation, update, function (err) {
            if (err) throw err;
        });
        res.sendFile(path.join(__dirname, "public/notes.html"));
        console.log(update);
    });
});


//render everything on the main page and makes sure get request is working 

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT: ", (PORT));
});
