var express = require('express');
var app = express();


app.set('port', (process.env.PORT) || 5000);

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

app.listen(app.get('port'), function(){
  console.log('Node app is running on port' + app.get('port'));
});

