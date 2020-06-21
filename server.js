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

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});


// use POST method to add a note

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let fileLocation = path.join(_dirname, "db/db.json");
    //adds the new note
    fs.readFile("db/db.json", "utf8", function (err, input) {
        if (err) throw err;
        let currentData = JSON.parse(input);
        newNote.id = currentData.length + newNote.title;
        currentData.push(newNote);
        let enhance = JSON.stringify(currentData);
        fs.writeFile(fileLocation, enhance, function(err) {
            if (err) throw err;
        });
        res.sendFile(path.join(_dirname, "public/notes.html"));
    })

    

})

// use DELETE method to be able to delete note 
app.delete("/api/notes/:id", function (req,res) {
    let directory = req.params.id;
    let fileLocation = path.join(_dirname, "db.db.json");


    fs.readFile(fileLocation, 'utf8', function (err, data) {
        if (err) throw err;
        let currentData = JSON.parse(input);
        for (let i = 0; i < currentData.length; i++) {
            if (currentData[i].id === directory) {
                currentData.splice(i, 1);
            }
        }
        let enhance = JSON.stringify(currentData);
        fs.writeFile(fileLocation, enhance, function(err) {
            if (err) throw err;
        });
    });
    res.sendfile(path.join(_dirname, "public/notes.html"));
});


//render everything on the main page

app.get("*", function(req, res) {
    res.sendFile(path.join(_dirname, "/public/index.html"));
});

//This is where the server will commence 
app.listen(PORT, function() {
    console.log("App listening on PORT: ", PORT);
});