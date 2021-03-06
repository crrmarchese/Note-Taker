// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality

const express = require("express");
const path = require("path");
// Import routes
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();


// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.


// Set a static folder
app.use(express.static(path.join(__dirname, "public")));


// Set the API file path
app.use(apiRoutes);

// Set the home page to its file
app.use(htmlRoutes);
 



// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, err => {
    if (err) {
        return console.log("ERROR", err);
    }
  console.log(`App listening on PORT: ${PORT}`);
});
