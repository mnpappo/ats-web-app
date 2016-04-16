var express = require('express');
var request = require('request');
var router = express.Router();

var api_url = 'https://ats-api.scalingo.io/parse/';
var appId = 'myAppId';

// get assets listing
router.get('/', function(req, res, next) {
  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"assets",
    method: "GET"
  },
  function(error, response, body) {
    //res.json(JSON.parse(response.body));

    if(response.body != "null" && response.statusCode == 200){
      var assets = JSON.parse(response.body);
      res.render('asset/asset_list', {assets: assets});
    }
    else if (response.body == "null" && response.statusCode == 200) {
      res.render('landing');
    }
    else {
      res.json(error);
    }
  });

});

// add new asset
router.get('/new', function(req, res) {
  res.render("asset/add_asset");
});

// add new asset
router.post('/new', function(req, res) {
  var params = req.body;
  var contentLength = params.length;
  console.log(params);

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': appId
    },
    uri: api_url+"assets/new",
    method: "POST",
    form: params
  },
  function(error, response, body) {
    //Check for right status code
    if(response){
      var asset = JSON.parse(response.body);
      //res.json(company);
      if (asset.objectId) {
        console.log('Successfully created company');
        res.redirect('/assets');
      }
    }
    else if (error) {
      res.json(error);
    }
  });
});


// get a asset
router.get('/:id', function(req, res){
  var object_id = req.params.id;

  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Parse-Application-Id': 'myAppId'
    },
    uri: api_url+"assets/"+object_id,
    method: "GET"
  },
  function(error, response, body) {
    // res.json(JSON.parse(response.body));

    if(response.body != "null" && response.statusCode == 200){
      var asset = JSON.parse(response.body);
      res.render('asset/single_asset', {asset: asset});
    }
    else if (response.body == "null" && response.statusCode == 200) {
      res.render('landing');
    }
    else {
      res.json(error);
    }
  });
});

// update a asset
router.put('/:id', function(req, res){
  res.send('update a asset');
});

// delete a asset
router.delete('/:id', function(req, res){
  res.send('delete a asset');
});


module.exports = router;
