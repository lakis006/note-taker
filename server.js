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

const noteData = [];

// when the data is collected it will end up as db.json here

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});


// use POST method to add a note

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    
    //adds the new note
    fs.readFile("db/db.json", "utf8", function (err, input) {
        if (err) throw err;


    })

    

})

// use DELETE method to be able to delete note 



//render everything on the main page

app.get("*", function(req, res) {
    res.sendFile(path.join(_dirname, "/public/index.html"));
});

//This is where the server will commence 
app.listen(PORT, function() {
    console.log("App listening on PORT: ", PORT);
});