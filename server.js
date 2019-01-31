const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/html-routes")(app);
require("./routes/scrape-routes")(app);

// Static directory
app.use('/static', express.static(path.join(__dirname, 'client/build/static')));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use('/static', express.static(path.join(__dirname, 'client/build/static')));
  // app.use(express.static(path.join(__dirname, 'client/build')));
}

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;

