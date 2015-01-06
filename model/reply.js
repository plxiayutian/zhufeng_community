/**
 * Created by zhang_renyang on 15/1/4.
 */
var dateUtils = require('../utils/dateUtils'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    replySchema = new Schema({
    content:String,
    parent_id:String,
    topic_id:String,
    user_id:String,
    create_time:Date,
    update_time:Date
},{collection:"reply"});

var replyModel = mongoose.model('Reply',replySchema);

var Reply = function(reply) {
    this.content = reply.content;
    this.parent_id = reply.parent_id;
    this.topic_id = reply.topic_id;
    this.user_id = reply.user_id;
}

Reply.prototype.save = function(callback){
    var newReply = new replyModel( {
        content:this.content,
        parent_id:this.parent_id,
        topic_id:this.topic_id,
        user_id:this.user_id
    });
    newReply.save(function(err,reply){
        if(err)
            callback(err);
        callback(null,reply);
    });
}

Reply.findByTopicId = function(topic_id,callback){
    replayModel.find({topic_id:topic_id},null,{},function(err,replies){
        if(err)
           callback(err);
        patchReplies(replies);
        callback(null,replies);
    });
}

function patchReplies(replies){
    if(replies && replies.length){
        for(var i=0;i<replies.length;i++){
            var reply = replies[i];
            replyModel.find({parent_id:reply._id},null,{},function(err,replies){
                patchReplies(replies);
                replies.children = replies;
            });
        }
    }
}


module.exports = Reply;

