var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/prephoops";
var MongoDB = mongoose.connect(mongoURI).connection;
var path = require('path');

MongoDB.on('error', function (err) {
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open');
});
var tweets = mongoose.model("tweet", {created_at:String, state:String, name:String, screen_name:String, followers_count:String, id_str:String, });
var person = ['@RyanJamesMN','@NorthstarAlex','@BrockLaue','@NickKosmider','@tonysroe','@TravisHines21','@TjRushing','@Corey_Albertson','@ZachFleerLGHL','@AdamJRossow','@Gobie247','@brijerzak','@INPrep','@InsideBBRecruit','@mikesanborn','@CoachCasey_LSUA','@_DerekAlleman','@scottybscout','@EmanPrepHoops','@MattPrepHoops','@generalmills101','@CoachRamirezPC','@BMDunson','@dyaste','@jnelson651','@jacklegwin','@japrephoopsaz','@DPrez304', '@prephoopsbatl', '@prephoopstv', '@prephoopsok', '@prephoopsil', '@prephoopsia', '@prephoopsmi', '@prephoopsfl', '@prephoopsin', '@prephoopsoh', '@prephoopsky', '@prephoopsdakota', '@prephoopsaz', '@wvprephoops', '@prephoopsmd', '@prephoopsla', '@utprephoops', '@prephoops_ns', '@nwprephoop', '@hoopreview', '@jrprephoops', '@bullsprephoops', '@coachredgate', '@fp_hoops', '@graceprephoops', '@laurelprephoops', '@gaprephoops', '@pureprephoops', '@fpshoops', '@cantonprephoops', '@pacificprepball', '@prephoopsvideos', '@sc_nc_postgrad', '@prephoopsiowa', '@neprephoops', '@northerninhoops', '@i80prep', '@prephoopsco', '@etprephoops', '@theprephoops', '@i80prephoops', '@prephoopsal', '@prephoopswv', '@i80i80', '@psphoops'];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
});
var twitter = require('ntwitter');
//var util = require('util');
var twit = new twitter({
  //These values will need to be changed to match the prephoops twitter account.  Right now they are set to a app registered to @5nahalf
  consumer_key: 'pu037E50fq109PqpCBQAh5mE0',
  consumer_secret: 'MxFJDArOhaMOIrq0FOZjSnSHd2ONk4qykiybyBdiUasAF3yj72',
  access_token_key: '2858804486-mvl0l34rTwG9wdrgdbBVvphfi4er7t9CbUiTbcj',
  access_token_secret: 'jWaiyUNUbDFINUiRgiRtt17NjkDdJHpr9IyOzADkrz2pI'
});
//twit.verifyCredentials(function (err, data) {
//        console.log(console.dir(data));
//    });

twit.stream('statuses/filter', {follow: '2858804486'}, function(stream) {
    stream.on('data', function (data) {
        console.log(data.id_str);
        console.log(data.source);
        console.log(data.user.id_str);
        console.log(data.user.screen_name);
        console.log(data.user.name);
        console.log(data.user.followers_count);
        console.log(data.retweeted_status.id_str);
        console.log(data.retweeted_status.source);
        console.log(data.retweeted_status.user.id_str);
        console.log(data.retweeted_status.retweet_count);
        console.log(data.retweeted_status.entities.hashtags);
        console.log(data.retweeted_status.entities.user_mentions);
        //console.log(data);
    });
    // Disconnect stream after five seconds
    //setTimeout(stream.destroy, 15000);
});

















//screen_name: '@prephoops' user_timeline
//var i = 0;
////var j = 0;
////for(j=0; j<person.length; j++) {
//    client.get('search/tweets', {q: person.toString()}, function (error, tweets, response) {
//        //for (i = 0; i < 1; i++) {
//            console.log(tweets);
//        console.log(person);
//            //console.log(tweets[i].retweet_count);
//            //console.log(tweets);
//        //}
//    });
//}
//client.stream('statuses/filter', {track: person},  function(stream){
//  stream.on('data', function(tweet) {
//      console.log(tweet.entities.user_mentions);
//  });
//
//  stream.on('error', function(error) {
//    console.log(error);
//  });
//});
module.exports = router;

