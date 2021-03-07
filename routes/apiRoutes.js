// DEPENDENCIES
const router = require("express").Router();
const fs = require("fs");
// Generate unique ids by using https://www.npmjs.com/package/uuid
const uuid = require ("uuid");
const dbData = require("../db/db.json");

// Read DB file and put data in variable
router.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) throw err;
        let getNotes = JSON.parse(data);
        res.json(getNotes);
    });
});


// Add a new note--Create 
// req.body is available since we're using the body parsing middleware
router.post("/api/notes", (req, res) => {
    let newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }; 
    
    // Read DB file, add newNote to array and write changes
    fs.readFile(".db/db.json", 'utf8', (err, data) => {
        
        if (err) throw err;
        let getNotes = JSON.parse(data);
        getNotes.push(newNote);
 
        fs.writeFile(".db/db.json", JSON.stringify(getNotes), err => {
            if (err) throw err;
            res.send(dbData);
        });
 
    });
 
 });
 

 // Update note
router.put("/api/notes/:id", (req, res) => {
    const findId = dbData.some(data => data.id === parseInt(req.params.id));
 
    if(findId) {
       const updateNote = req.body;
       dbData.forEach(data => {
           if (data.id === parseInt(req.params.id)){
              data.title = updateNote.title ? updateNote.title : data.title;
              data.text = updateNote.text ? updateNote.text : data.text;
 
              res.json({msg: "Note updated", data});
           }
       });
    } else {
        res.status(400).json({msg: `No record with the id of ${req.params.id}`});
    }       
 
 });




module.exports = router;