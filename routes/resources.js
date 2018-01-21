var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('resources', {title : 'Resources'})
});

router.get('/:topic', function(req, res, next) {
  
  if(req.params.topic && req.params.topic != 'favicon.ico') {
    let topic = req.params.topic;
    console.log(topic);
    return knex('resource').where({page: topic}).then((resource) => {
      //chuck at the templating engine
      if(!resource) {
        var resource = [];//cover empty array case
      }
      let resourceJSON = JSON.stringify(resource);//stringfy so jade can handle
      
      res.render('resourceTemplate', { title: 'Resources' , resources: resourceJSON, pageTitle: topic});
      return;
    }); 
  } else {
    res.render('resources', { title: 'Resources' });
  }
  
});

module.exports = router;