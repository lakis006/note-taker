const fs = require("fs");
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);


const app = express();
const PORT = process.env.PORT || 9000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

let storedInfo = [];

//the routes that will render notes 

app.get("/notes", function (req, res) {
    res.sendFile(path.join(_dirname, "public/notes.html"));
});

// when the data is collected it will end up as db.json here

app.get("/api/notes", async (req, res) {
    try {
        return res.json(JSON.parse(await readAsync(path.join(_dirname, "/db/db.json"), "utf8")));
    } catch (err) {
        console.log(err);
    }
});


// use POST method to add a note

app.post("/api/notes", async (req, res) {
   try {
       let newNote = JSON.parse(JSON.stringify(req.body));
       newNote.id = uuidv4();
       console.log(newNote);

       let newArray = JSON.parse(await readAsync(path.join(_dirname, "/db/db.json"), "utf-8"));
       newArray.push(newNote);
       await writeAsync(path.join(_dirname, "/db/db.json"), JSON.stringify(newArray));

       return res.json(newNote);
   } catch (err) {
       console.log(err);
   }
});

// use DELETE method to be able to delete note 
app.delete("api/notes/:id", function (req,res) {
   console.log("It deletes!!");
   let newDelete = req.params.id;
   let newData = fs.readFileSync(path.join(_dirname, "/db/db.json"), 'utf-8');
    let newArray = JSON.parse(newData);
    for (note of newArray) {
        if (note.id == newDelete) {
            newArray.pop(note);
            fs.writeFileSync(path.join(_dirname, "/db/db.json"), JSON.stringify(newArray));
        }
    }

    res.json({message: "File Deleted"})
});


//render everything on the main page and makes sure get request is working 

app.get("*", function (req, res) {
    res.sendfile(path.join(_dirname, "public/index.html"));
});

//This is where the server will commence 
app.listen(PORT, function() {
    console.log("App listening on PORT: ", PORT);
});