var express = require('express');
var request = require('request');
var router = express.Router();

var api_url = 'https://ats-api.scalingo.io/parse/';
var appId = 'myAppId';

// get companies listing
router.get('/', function(req, res, next) {
  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"companies",
    method: "GET"
  },
  function(error, response, body) {
    //res.json(JSON.parse(response.body));

    if(response.body != "null" && response.statusCode == 200){
      var companies = JSON.parse(response.body);
      res.render('company/company_list', {companies: companies});
    }
    else if (response.body == "null" && response.statusCode == 200) {
      res.render('landing');
    }
    else {
      res.json(error);
    }
  });

});

// add new company
router.get('/new', function(req, res, next) {
  res.render('company/add_company');
});

// add new company
router.post('/new', function(req, res, next) {
  var params = req.body;
  var contentLength = params.length;
  console.log(params);

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"companies/new",
    method: "POST",
    form: params
  },
  function(error, response, body) {
    //Check for right status code
    if(response){
      var company = JSON.parse(response.body);
      //res.json(company);
      if (company.objectId) {
        console.log('Successfully created company');
        res.redirect('/companies');
      }
    }
    else if (error) {
      res.json(error);
    }
  });

});

// get a company
router.get('/:id', function(req, res){
  res.render('company/single_company');
});

// update a company
router.put('/:id', function(req, res){
  res.render('company/edit_company');
});

// delete a company
router.delete('/:id', function(req, res){
  res.send('delete a company');
});


module.exports = router;
