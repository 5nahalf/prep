var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema(
    {
        date_created:String,
        user_name:String,
        id_str:String,
        num_followers:Number,
        source:String,
        num_entities:Number,
        num_tweets:Number,
        num_retweets:Number,
        num_mentions:Array,
        reSource:String
    });

module.exports = mongoose.model('tweets', model);