# NoteWriter

## Description
This application allows the user to input a title and information for each note and save them. Saved notes appear in the left hand sidebar and if clicked on will be displayed in the main note section. Additionally, this app made use of Node.js, Express.js and javascript to create the front and backend of the application. 

## Table of Contents
- [Description](#description)
- [Code Snippet](#code-snippet)
- [Technologies Used](#technologies-used)
- [Installation](#instalation)
- [Contact Information](#contact-information)

## Image
![Image](/noteTaker.JPG)

## Code Snippet
The code snippet below shows the post method to display a new note entered. 

``` app.post("/api/notes", (req, res) => {

  const currentNote = req.body;
  //retrieve notes from db.json, get id of last note, add 1 to it to create 
  //new id, save current note with new id
fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
    if (error) {
        return console.log(error)
    }
    notesInfo = JSON.parse(notes)
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
```

## Technologies Used
- Node.Js
- Express.Js 
- JavaScript
- Git
- GitHub
- HTML
- Boot Strap 

## Installation
- Inquirer
- Express 
- Path 

## Contact Information 
- [GitHub](https://github.com/mkelly3/)
- [Linkedin](https://www.linkedin.com/in/morgan-kelly15/)
