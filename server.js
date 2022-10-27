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


// //use POST method to bring user input to backend
app.post("/notes", (req, res) => {
  readFileAsync("db/db.json", "utf8").then(function (data) {
    // Parse data to get an array of objects
    notesInfo = JSON.parse(data);

    let newNote = req.body;
    let currentID = notesData.length;

    newNote.id = currentID + 1;
    // Add new note to the array of note objects
    notesInfo.push(newNote);

    notesInfo = JSON.stringify(notesInfo);

    writeFileAsync("db/db.json", notesInfo).then(function (data) {
      console.log("Note has been added.");
    });
    res.json(notesInfo);
  });
});


app.delete("/notes/:id", (req, res) => {

  let selID = JSON.parse(req.params.id);

  for (let i = 0; i < notesInfo.length; i++) {
    if (selID === notesInfo[i].id) {
      notesInfo.splice(i,1);
      let noteJSON = JSON.stringify(notesInfo,null,2);

      writeFileAsync("db/db.json", noteJSON).then(function () {
        console.log("Note has been deleted.");
      });
    }
  }
  res.json(notesInfo);
});


// using express lisener to go to PORT 3001
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;