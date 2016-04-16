var express = require('express');
var router = express.Router();
var request = require('request');

var api_url = 'https://ats-api.scalingo.io/parse/';
var appId = 'myAppId';

// get users listing
router.get('/', function(req, res, next) {
  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"users",
    method: "GET"
  },
  function(error, response, body) {
    //res.json(JSON.parse(response.body));

    if(response.body != "null" && response.statusCode == 200){
      var users = JSON.parse(response.body);
      res.render('user/user_list', {users: users});
    }
    else if (response.body == "null" && response.statusCode == 200) {
      res.render('landing');
    }
    else {
      res.json(error);
    }
  });
});

// new user form
router.get('/new', function(req, res) {
  res.render("user/add_user");
});

// signup
router.post('/new', function(req, res) {
  var params = req.body;
  var contentLength = params.length;

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"users/new",
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

// get a user
router.get('/:id', function(req, res){
  var object_id = req.params.id;

  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"users/"+object_id,
    method: "GET"
  },
  function(error, response, body) {
    // res.json(JSON.parse(response.body));

    if(response.body != "null" && response.statusCode == 200){
      var user = JSON.parse(response.body);
      res.render('user/single_user', {user: user});
    }
    else if (response.body == "null" && response.statusCode == 200) {
      res.render('landing');
    }
    else {
      res.json(error);
    }
  });

});

// update a user
router.put('/:id', function(req, res){
  res.send("update a user");
});

// delete a user
router.delete('/:id', function(req, res){
  res.send("delete a user");
});


module.exports = router;
