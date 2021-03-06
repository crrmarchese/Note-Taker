// DEPENDENCIES
// We need to include the path package to get the correct file path for our html

const path = require('path');
const router = require("express").Router();

// ROUTING
  // Set the root to the index.html page
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Set the /note path to notes.html
  router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });


  // If no matching route is found default to home
 router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
  module.exports = router;
