var express = require('express');
var router = express.Router();

/* POST set user */
router.post('/setUser', function(req, res, next) {
  //set user from AJAX POST request

  //first check there is not already a session for that user

  //then create a session for that user


  
  res.render('events', { title: 'Events' });
});

/* POST guess flag */
router.post('/guessFlag', function(req, res, next) {
  //grab guess from post data

  //query db for flag

  //check if already got it correct

  //update db if correct

  //respond with success or fail feedback


  
  res.render('events', { title: 'Events' });
});

module.exports = router;