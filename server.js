const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const PORT =  process.env.PORT || 3001;

var notesInfo; 


// Uses express to parse all json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


//uses express to direct user to either the Index.html or notes html 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//uses the express get method to get all of the notes and parse in JSON
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error,notes) => {
      if (error) {
          return console.log(error)
      }
      res.json(JSON.parse(notes))
  })
});


//use POST method to bring user input to backend
app.post("/api/notes", (req, res) => {
    //declare const for the note currently being saved by user
    const currentNote = req.body;
    //retrieve notes from db.json, get id of last note, add 1 to it to create 
    //new id, save current note with new id
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
      if (error) {
          return console.log(error)
      }
      notes = JSON.parse(notes)

      let newNote = { 
        title: currentNote.title, 
        text: currentNote.text, 
        }
    
        var newNotesArr = notes.concat(newNote)

      //write new array to db.json file and return it to user
      fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNotesArr), (error, data) => {
        if (error) {
          return error
        }
        console.log(newNotesArr)
        res.json(newNotesArr);
      })
  });
 
});


// using express lisener to go to PORT 3001
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;