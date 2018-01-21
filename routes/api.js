var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile'))

//POST add resource
router.post('/addResource', function(req,res,next) {
  //add resource info to DB
  console.log('back end add resporce attempt');
  console.log(req.body);
  if(req.body.title && req.body.text && req.body.link && req.body.page) {
      //have all the info we need
      return knex('resource').insert({title: req.body.title, text: req.body.text, link: req.body.link, votes: 0, page:req.body.page}).then(() => {
        res.json({valid: true});
    
      });
  }
});

/* POST set user */
router.post('/setUser', function(req, res, next) {
    console.log('got set name request')
  //set user from AJAX POST request
  if(req.body.username) {
    let username = req.body.username;
    //first check there is not already a session for that user
    console.log(username);
    return knex('user').where({username: username}).then(([user]) => {
        console.log('resolved db query for username');
        if(!user) {
            //name needs to be added
            return knex('user').insert({username: username, score: 0, sessionScore: 0}).then(() => {
                res.json({valid : true});
            });

            
        } else {
            res.json({valid : true});
        }
    });
  

  } else {
      console.log(req.body);
     res.json({valid : false});
  }

 
});

/* POST guess flag */
router.post('/guessFlag', function(req, res, next) {
  //get flag from AJAX POST request
  if(req.body.username && req.body.guess) {
    let username = req.body.username;
    let guess = req.body.guess;
    //first check whether that flag is in the table
    return knex('flag').where({value: guess}).then(([flag]) => {
        if(!flag) {
            //flag incorrect
            return knex('user').where({username: username}).then(([user]) => {
                console.log(user);
                let sessionScore = user.sessionScore;
                res.json({valid : false, score: sessionScore});
            });

            
        } else {
            //now we need to check to see if user already has flag
            let flagNum = flag.id;
            return knex('user').where({username: username}).then(([user]) => {
                if(!user) {
                    res.json({valid : false});
                } else {
                    let userNum = user.id;
                    let userSessionScore = user.sessionScore;
                    let userScore = user.score;
                    return knex('userflag').where({userID: userNum, flagID: flagNum}).then(([userflag]) => {
                        if(!userflag) {
                            //not been found yet
                            //update userFlag and user record to reflect this
                            return knex('userflag').insert({userID: userNum, flagID: flagNum}).then(() => {
                                let newSessionScore = userSessionScore + 10;
                                let newScore = userScore + 10;
                                return knex('user').where({username: username}).update({sessionScore: newSessionScore, score: newScore}).then(() => {
                                    res.json({valid: true, score: newSessionScore});
                                });
                            });
                        } else {
                            //already been found
                            res.json({valid: true, score: userSessionScore});
                        }
                    });
                }
            });
            res.json({valid : true});
        }
    });
  

  } else {
     res.json({valid : false});
  }

 
});

router.get('/sessionScores', function(req,res,next) {
    return knex('user').orderBy('sessionScore','desc').then(function(rows) {
        let scoreTable = [];
        for(var i = 0;i < rows.length; i++) {
            scoreTable.push({username : rows[i].username, score: rows[i].sessionScore});
        }
        console.log(scoreTable);
        res.json({scores: scoreTable});
    });
});

module.exports = router;