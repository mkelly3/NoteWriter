const express = require('express');
const fs = require(fs)
const app = express();
const PORT = 3001;

var notesInfo; 


// Uses express to parse all json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


//using express to get dat from index.html 
app.get("/", (req, res) => {
    res.sendFile(path.join("./public/index.html"))
});

//using express to get dat from notes.html 
app.get("/", (req, res) => {
    res.sendFile(path.join("./public/notes.html"))
});


//Parsing through notes data and posting it on the notes.html 

app.get("/api/notes",(req, res) => {

    
});

// using express lisener to go to PORT 3001
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;