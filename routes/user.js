var express = require('express');
var router = express.Router();

// get users listing
router.get('/', function(req, res, next) {
  res.render("user/user_list");
});

// new user form
router.get('/new', function(req, res) {
  res.render("user/add_user");
});

// signup
router.post('/new', function(req, res) {
  res.send("Post user");
});

// get a user
router.get('/:id', function(req, res){
  res.render("user/single_user");
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
