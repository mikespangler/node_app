
// // get the http and filesystem modules

var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});


// get an instance of the router
var adminRouter = express.Router();

adminRouter.use(function(req,res,next){
  console.log(req.method, req.url);
  next();
});

adminRouter.param('name', function(req,res,next,name){
  console.log('doing name validations on ' + name);
  req.name = 'Pedro'
  next();
});

// admin main page. the dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res) {
  res.send('I am the dashboard!');
});

// users page (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res) {
  res.send('I show all the users!');
});
// posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res) {
  res.send('I show all the posts!');
});

adminRouter.get('/users/:name', function(req, res) {
  res.send('hello ' + req.name + '!');
});

// apply the routes to our application
app.use('/admin', adminRouter);


// start the server
app.listen(1337);
console.log('1337 is the magic port!');
