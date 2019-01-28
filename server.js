const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use('/static', express.static(path.join(__dirname, 'client/build/static'))); // production build directory
app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;

