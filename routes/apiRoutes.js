// DEPENDENCIES
const router = require("express").Router();
const { resolveSoa } = require("dns");
const fs = require("fs");
// Generate unique ids by using https://www.npmjs.com/package/uuid
const uuid = require ("uuid");
const dbData = require("../db/db.json");


// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
router.get("/api/notes", async (req, res) => {
    try {
        res.json(dbData);

    } catch (err) {
        res.status(500).end();
    }
});

// Add a new note--Create NOT WORKING
// req.body is available since we're using the body parsing middleware
router.post("/api/notes", (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    } 
    
    if (!newNote.title || !newNote.text) {
        return res.status(400).json({msg: "Please include a title and text"})
    }

    // Add newNote to array
    dbData.push(newNote);
    res.json(dbData);

});

// Update note--NOT WORKING
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

// Delete note
router.delete("/api/notes/:id", (req, res) => {
    const findId = dbData.some(data => data.id === parseInt(req.params.id));

    if(findId) {
        res.json({ 
            msg: 'Note deleted', 
            dbData: dbData.filter(data => data.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({msg: `No record with the id of ${req.params.id}`});
    }

});


module.exports = router;