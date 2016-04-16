/* Dashboard controller */
var request = require('request');
var express = require('express');
var router = express.Router();

var api_url = 'https://ats-api.scalingo.io/parse/';
var appId = 'myAppId';

/* GET landing page. */
router.get('/', function(req, res) {

  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url,
    method: "GET"
  },
  function(error, response, body) {
    if(response.body != "null" && response.statusCode == 200){

      var user = JSON.parse(response.body);

      if (user.username) {
        var user = JSON.parse(response.body);
        res.render('dashboard', {user: user});
      }
      else {
        res.send("Coudn't get data from parse");
      }
    }
    else if (response.body == "null" && response.statusCode == 200) {
      res.render('landing');
    }
    else {
      res.json(error);
    }
  });

});

// create user
router.post('/', function(req, res) {
  var params = req.body;
  var contentLength = params.length;

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url,
    method: "POST",
    form: params
  },
  function(error, response, body) {

    if(response){
      console.log(response);
      if (response.body.code) {
        console.log(response.body.code);
        res.send(response.body.message);
      }
      else {
        res.redirect('/dashboard');
      }
    }
    else if (error) {
      res.json(error);
    }
  });

});


/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {

  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url,
    method: "GET"
  },
  function(error, response, body) {
    if(response.body != "null" && response.statusCode == 200){

      var user = JSON.parse(response.body);

      if (user.username) {
        var user = JSON.parse(response.body);
        res.render('dashboard', {user: user});
      }
      else {
        res.send("Coudn't get data from parse");
      }
    }
    else if (response.body == "null" && response.statusCode == 200) {
      res.render('landing');
    }
    else {
      res.json(error);
    }
  });

});

/* GET dashboard page. */
router.post('/login', function(req, res, next) {
  var params = req.body;
  var contentLength = params.length;

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"login",
    method: "POST",
    form: params
  },
  function(error, response, body) {
    if(response){
      var user = JSON.parse(response.body);
      // res.json(response);
      if (user.username) {
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
      res.json(error);
    }
  });

});

// logout
router.get('/logout', function(req, res) {

  request({
    headers: {
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"logout",
    method: "GET"
  },
  function(error, response, body) {
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
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"profile",
    method: "GET"
  },
  function(error, response, body) {
    if(response){
      var user = JSON.parse(response.body);
      res.render('profile', {user : user});
    }
    else if (error) {
      res.json(error);
    }
  });

});

module.exports = router;
