const fs = require("fs");
const express = require("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

let storedInfo = [];

//the routes that will render notes 

app.get("/notes", function (req, res) {
    res.sendFile(path.join(_dirname, "/public/notes.html"));
});

// when the data is collected it will end up as db.json here

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        let theData = JSON.parse(data);
        return res.json(theData);
    });
});


// use POST method to add a note

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
   
    //adds the new note
    fs.readFile("db/db.json", "utf8", function (err, input) {
        if (err) throw err;
        let storedInfo = JSON.parse(input);
        storedInfo.push(newNote);
      
        for (let i in storedInfo) {
            storedInfo[i].id = parseInt([i]) + 1;
        }

        fs.writeFile("db/db.json", JSON.stringify(storedInfo), function(err) {
            if (err) throw err;
        });
        res.json(true);
    });
});

// use DELETE method to be able to delete note 
app.delete("/api/notes/:id", function (req,res) {
    let deleteDirectory = req.params.id;
   


    fs.readFile("db/db.json", 'utf8', function (err, input) {
        if (err) throw err;
        storedInfo = JSON.parse(input);
        storedInfo.splice(deleteDirectory - 1, 1);

        for (let i in storedInfo) {
            storedInfo[i].id = parseInt([i]) + 1;
        }

    
        fs.writeFile("db/db.json", JSON.stringify(storedInfo), function(err) {
            if (err) throw err;
        });
    });
    res.json(storedInfo);
});


//render everything on the main page



//This is where the server will commence 
app.listen(PORT, function() {
    console.log("App listening on PORT: ", PORT);
});