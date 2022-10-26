const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT =  process.env.PORT || 3001;

var notesInfo; 


// Uses express to parse all json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


//using express to get dat from index.html 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
});

//using express to get dat from notes.html 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/notes.html"))
});


//Parsing through notes data and posting it on the notes.html 

app.get("/api/notes",(req, res) => {
    fs.readFileSync(path.join(__dirname,"./db/db.json","utf-8")).then(function(response){
        notesInfo = JSON.parse(response);
        res.json(notesInfo);
    });
});
// Post to the notes page
app.post("/api/notes",(req, res) => {
    fs.readFileSync(path.join(__dirname,"./db/db.json","utf-8")).then(function(response){
        //accessing the current note form the webpage 
        const currentNote = req.body;
        var currentId = notesInfo.length;
        currentNote.id = currentId + 1;

        notesInfo.push(currentNote);
        notesInfo = JSON.stringify(notesInfo);
        fs.writeFileSync("./db/db.json",notesInfo).then(function(dtat){
            console.log("New Note Added!")
        })

        res.json(notesInfo);
    });
});

// using express lisener to go to PORT 3001
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;