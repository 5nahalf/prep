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
//This is tweet database structure.  This will be populated by the twitter stream.
var tweets = mongoose.model('tweets', {date_created:Date, user_name:String, id_str:String, num_tweets:Number, num_retweets:Number, num_mentions:Number, num_followers:Number, num_entities:Number});
//This is the use database to pull from for the stream query.  This will be populated by the admin in a add/remove
var user = mongoose.model('users', {user_name:String, id_str:String, state:String});


var person = user.user_name;
    //['@RyanJamesMN','@NorthstarAlex','@BrockLaue','@NickKosmider','@tonysroe','@TravisHines21','@TjRushing','@Corey_Albertson','@ZachFleerLGHL','@AdamJRossow','@Gobie247','@brijerzak','@INPrep','@InsideBBRecruit','@mikesanborn','@CoachCasey_LSUA','@_DerekAlleman','@scottybscout','@EmanPrepHoops','@MattPrepHoops','@generalmills101','@CoachRamirezPC','@BMDunson','@dyaste','@jnelson651','@jacklegwin','@japrephoopsaz','@DPrez304', '@prephoopsbatl', '@prephoopstv', '@prephoopsok', '@prephoopsil', '@prephoopsia', '@prephoopsmi', '@prephoopsfl', '@prephoopsin', '@prephoopsoh', '@prephoopsky', '@prephoopsdakota', '@prephoopsaz', '@wvprephoops', '@prephoopsmd', '@prephoopsla', '@utprephoops', '@prephoops_ns', '@nwprephoop', '@hoopreview', '@jrprephoops', '@bullsprephoops', '@coachredgate', '@fp_hoops', '@graceprephoops', '@laurelprephoops', '@gaprephoops', '@pureprephoops', '@fpshoops', '@cantonprephoops', '@pacificprepball', '@prephoopsvideos', '@sc_nc_postgrad', '@prephoopsiowa', '@neprephoops', '@northerninhoops', '@i80prep', '@prephoopsco', '@etprephoops', '@theprephoops', '@i80prephoops', '@prephoopsal', '@prephoopswv', '@i80i80', '@psphoops'];


var twitId = user.id_string;
    //['75009946', '2584210789', '1010015023', '21833263', '138878381', '80111751', '171180712', '343187164', '144066659', '1354514275', '29633450', '2756639917', '23646710', '42306613', '1952441196', '31216674', '24978743', '258982303', '319983709', '438856210', '456045783', '3218886313', '1317396211', '164500785', '169674258', '216748542', '2978214263', '270670539', '2906836180', '245626725', '3013129701'];
/* GET home page. */

router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
});
var twitter = require('ntwitter');
var twit = new twitter({
  //These values will need to be changed to match the prephoops twitter account.  Right now they are set to a app registered to @5nahalf
  consumer_key: 'pu037E50fq109PqpCBQAh5mE0',
  consumer_secret: 'MxFJDArOhaMOIrq0FOZjSnSHd2ONk4qykiybyBdiUasAF3yj72',
  access_token_key: '2858804486-mvl0l34rTwG9wdrgdbBVvphfi4er7t9CbUiTbcj',
  access_token_secret: 'jWaiyUNUbDFINUiRgiRtt17NjkDdJHpr9IyOzADkrz2pI'
});


//this twit.stream uses follow and track.  follow MUST be the users id_str or the program crashes.  track can be @twitterusername
twit.stream('statuses/filter', {follow: twitId, track: person}, function(stream) {
    stream.on('data', function (data) {
        console.log("Tweet ID number " + data.id_str, "Source of Tweet " + data.source, "ID of user " + data.user.id_str, "Username " + data.user.screen_name, "Real name " + data.user.name, "Users followers " + data.user.followers_count);
        if(data.retweeted_status == null){
            console.log('not a rewtweet')
        } else {
            console.log("Tweet ID of original tweet " + data.retweeted_status.id_str, "Source of Retweet " + data.retweeted_status.source, "ID string of original Tweeter " + data.retweeted_status.user.id_str, "Rewteet count " + data.retweeted_status.retweet_count, "User Mentions " + data.retweeted_status.entities.user_mentions);

        }
    });
});











module.exports = router;

//console.log(data.retweeted_status.source);
//console.log(data.retweeted_status.user.id_str);
//console.log(data.retweeted_status.retweet_count);
//console.log(data.retweeted_status.entities.hashtags);
//console.log(data.retweeted_status.entities.user_mentions);
//console.log(data.source);
//console.log(data.user.id_str);
//console.log(data.user.screen_name);
//console.log(data.user.name);
//console.log(data.user.followers_count);