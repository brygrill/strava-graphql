var path = require('path');
var express = require('express');

// Init Expres
var app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// For React Router when not coming in from main route
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Server Listening on Port 3000');
});
