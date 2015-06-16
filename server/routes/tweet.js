var express = require('express');
var router = express.Router();
var Tweets = require('../../models/tweets');

router.get('/', function(req, res, next) {
  Tweets.find(function(err, tweets){
    console.log('tweet tweet');
    res.json(tweets);
  })
});

module.exports = router;