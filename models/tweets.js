var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema(
    {
        date_created:Date,
        user_name:String,
        id_str:String,
        num_tweets:Number,
        num_retweets:Number,
        num_mentions:Number,
        num_followers:Number,
        num_entities:Number
    });

module.exports = mongoose.model('tweets', model);