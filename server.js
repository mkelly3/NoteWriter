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
      var id = notes.length + 1
      let newNoteObj = { 
        title: currentNote.title, 
        text: currentNote.text,
        id:id 
        }
    
        var newNotesArr = notes.concat(newNoteObj)

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

app.delete(("/api/notes:id"),(req, res) => {
  let idDelete = JSON.parse(req.params.id);
  fs.readFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNotesArr), (error, data) => {
    if (error) {
      return error
    }
  let notesArr = JSON.parse(data);
  for (var i=0; i<notesArr.length; i++){
    if(idDelete== notesArr[i].id) {
      notesArr.splice(i,1);

      fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notesArr), (error, data) => {
       if (error) {
         return error
       }
       console.log(notesArr)
       res.json(notesArr);
     })
    }
 }
 
}); 
});



// using express lisener to go to PORT 3001
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;