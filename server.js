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


//direct user to correct page depending on url
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes", (req, res) => {
 res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//getting data from db.json and using JSON parse 
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

  const currentNote = req.body;
  //Retrive data from db.JSOn
fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
    if (error) {
        return console.log(error)
    }
    notesInfo = JSON.parse(notes)
    //Make the note id equal to the length of the notesinfo array
    var noteId = notesInfo.length;
    //create new note object
    let newNote = { 
      title: currentNote.title, 
      text: currentNote.text, 
      id: noteId
      }
    //merge new note with existing notes array
    var newNotesArr = notesInfo.concat(newNote)
    //write new array to db.json file and retuern it to user
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNotesArr), (error, data) => {
      if (error) {
        return error
      }
      console.log(newNotesArr)
      res.json(newNotesArr);
    })
});

});

//delete chosen note using delete http method
app.delete("/api/notes/:id", (req, res) => {
  let deleteId = JSON.parse(req.params.id);
  console.log(deleteId);
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error,notes) => {
    if (error) {
        return console.log(error)
    }
   let notesArray = JSON.parse(notes);
   //loop through notes array and remove note with id matching deleteId
   for (var i=0; i<notesArray.length; i++){
     if(deleteId == notesArray[i].id) {
       notesArray.splice(i,1);

       fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notesArray), (error, data) => {
        if (error) {
          return error
        }
        console.log(notesArray)
        res.json(notesArray);
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

