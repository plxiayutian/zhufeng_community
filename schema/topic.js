/**
 * Created by zhang_renyang on 15/1/4.
 */
var dateUtils = require('../utils/dateUtils');
var setttings = require('../settings');
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    topicSchema = new Schema({

        articleTitle:String,
        functionDescription:String,
        //user_id:{type:ObjectId,ref:'User'},
        articleExamples:String,
        jobInterview:String,
        topic_id:String,
        create_time:Date,
        update_time:Date
        //visit_count:Number,
        //reply_count:Number
    },{collection:"topic"});
var topicModel = mongoose.model('Topic',topicSchema);
module.exports= topicModel;