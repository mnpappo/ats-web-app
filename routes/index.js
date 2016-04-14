/* Dashboard controller */
var request = require('request');
var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res) {
  res.render('landing');

});

// create user
router.post('/', function(req, res) {
  var params = req.body;
  var contentLength = params.length;

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': 'myAppId'
    },
    uri: "http://localhost:1337/parse/",
    method: "POST",
    form: params
  },
  function(error, response, body) {
    //Check for right status code
    if(response){
      console.log('user created succesfilly');
      console.log(response);
      if (response.body.code) {
        console.log(response.body.code);
        res.send(response.body.message);
      }
      else {
        res.redirect('http://127.0.0.1/parse/dashboard');
      }
    }
    else if (error) {
      console.log(response);
      console.log(body);
      console.log(error);
      res.json(error);
    }
  });

});


/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {

  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': 'myAppId'
    },
    uri: "http://localhost:1337/parse/dashboard",
    method: "GET"
  },
  function(error, response, body) {
    //Check for right status code
    if(response){
      console.log(response.body);
      var user = JSON.parse(response.body);
      //res.json(response);
      // res.render('dashboard');

      if (response.body == "null" && response.statusCode == 200) {
        res.redirect('/');
      }
      else if (user.username) {
        var user = JSON.parse(response.body);
        //res.json(response);
        res.render('dashboard', {user: user});
      }
      else {
        res.send("Coudn't get data from parse");
      }
    }
    else if (error) {
      console.log(response);
      console.log(body);
      console.log(error);
      res.json(error);
    }
  });

});

/* GET dashboard page. */
router.post('/login', function(req, res, next) {
  var params = req.body;
  var contentLength = params.length;
  console.log(params);

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': 'myAppId'
    },
    uri: "http://localhost:1337/parse/login",
    method: "POST",
    form: params
  },
  function(error, response, body) {
    //Check for right status code
    if(response){
      var user = JSON.parse(response.body);
      //res.json(user);
      if (user.username) {
        console.log('Successfully logged in');
        res.redirect('/dashboard');
      }
      else if (user.code == 101) {
        res.send("Invalid Password");
      }
      else {
        res.send("Unknown error");
      }
    }
    else if (error) {
      console.log(response);
      console.log(body);
      console.log(error);
      res.json(error);
    }
  });

});

// logout
router.get('/logout', function(req, res) {
  request({
    headers: {
      'X-Parse-Application-Id': 'myAppId'
    },
    uri: "http://localhost:1337/parse/logout",
    method: "GET"
  },
  function(error, response, body) {
    // res.json(response);
    console.log(response);

    if (response.body == "null" && response.statusCode == 200) {
      res.redirect('/');
    }
  });
});


// get current profile page
router.get('/profile', function(req, res, next) {
  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': 'myAppId'
    },
    uri: "http://localhost:1337/parse/profile",
    method: "GET"
  },
  function(error, response, body) {
    //Check for right status code
    if(response){
      var user = JSON.parse(response.body);
      //res.json(user);
      res.render('profile', {user : user});
    }
    else if (error) {
      console.log(response);
      console.log(body);
      console.log(error);
      res.json(error);
    }
  });
  // res.render('profile');
});

module.exports = router;
