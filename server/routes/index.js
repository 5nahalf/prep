var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
});
var Twitter = require('twitter');
var util = require('util');
var client = new Twitter({
  //These values will need to be changed to match the prephoops twitter account.  Right now they are set to a app registered to @5nahalf
  consumer_key: 'pu037E50fq109PqpCBQAh5mE0',
  consumer_secret: 'MxFJDArOhaMOIrq0FOZjSnSHd2ONk4qykiybyBdiUasAF3yj72',
  access_token_key: '2858804486-mvl0l34rTwG9wdrgdbBVvphfi4er7t9CbUiTbcj',
  access_token_secret: 'jWaiyUNUbDFINUiRgiRtt17NjkDdJHpr9IyOzADkrz2pI'
});

var count = 0;
client.get('search/tweets', {q: 'love'}, function(error, tweets, response){
    console.log(tweets.statuses[0].text);
});
//client.stream('statuses/filter', {track: 'e30'},  function(stream){
//  stream.on('data', function(tweet) {
//    console.log(tweet);
//  });
//
//  stream.on('error', function(error) {
//    console.log(error);
//  });
//});
module.exports = router;
