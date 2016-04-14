var express = require('express');
var request = require('request');
var router = express.Router();

// get companies listing
router.get('/', function(req, res, next) {
  res.render("company/company_list");
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
      'X-Parse-Application-Id': 'myAppId'
    },
    uri: "http://localhost:1337/parse/companies/new",
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
