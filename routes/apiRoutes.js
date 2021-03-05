// DEPENDENCIES
const router = require("express").Router();
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

// Add a new note--CREATE  NOT WORKING
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



module.exports = router;