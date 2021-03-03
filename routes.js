 const router = require("express").Router();
 const path = require ("path");
 const dbData = require("./db/db.json");

// HTML Routes
router.get("/", async (req, res) => {
    try {
        res.sendFile(__dirname + "/public/index.html");

    } catch (err) {
        res.status(500).end();
    }
});

 router.get("/notes", async (req, res) => {
    try {
        res.sendFile(__dirname + "/public/notes.html");

    } catch (err) {
        res.status(500).end();
    }
});

//  Catch all goes to home page
router.get("*", async (req, res) => {
    try {
        res.sendFile(__dirname + "/public/index.html");

    } catch (err) {
        res.status(500).end();
    }
});

// API Route
router.get("/api/notes", async (req, res) => {
    try {
        res.json(dbData);

    } catch (err) {
        res.status(500).end();
    }
});

module.exports = router;