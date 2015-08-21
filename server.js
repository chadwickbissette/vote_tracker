var express = require('express');
var app = express();


// Serve the static files of votetracker
app.use(express.static('public'));

// Secret message
app.get('/secret', function(req, res){
  res.send('This is a secret message!');
});

// Send 404.html for all
app.use(function(req, res, next){
  res.status(404).sendFile(__dirname + '/404.html')
});

app.listen(5000, function(){
  console.log('Node app is running and listening at port 5000');
});

