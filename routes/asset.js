var express = require('express');
var request = require('request');
var router = express.Router();

// get assets listing
router.get('/', function(req, res, next) {
  res.render("asset/asset_list");
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
      'X-Parse-Application-Id': 'myAppId'
    },
    uri: "http://localhost:1337/parse/assets/new",
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
  res.render("asset/single_asset");
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
