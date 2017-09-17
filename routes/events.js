var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  //connect to db and find list of events
  res.render('events', { title: 'Events' });
});

module.exports = router;