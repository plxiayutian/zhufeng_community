/**
 * Created by zhang_renyang on 15/1/4.
 */
var dateUtils = require('../utils/dateUtils');
var topicModel = require('../schema/topic');

function Topic(topic){
    this.articleTitle = topic.articleTitle;
    this.functionDescription = topic.functionDescription;
    this.articleExamples = topic.articleExamples;
    this.jobInterview=topic.jobInterview;
    this.topic_id=topic.topic_id;
}
//保存数据
Topic.prototype.save = function(callback){
    var newTopic = new topicModel({
        articleTitle:this.articleTitle,
        functionDescription:this.functionDescription,
        articleExamples:this.articleExamples,
        jobInterview:this.jobInterview,
        topic_id:this.topic_id,
        create_time:dateUtils.getTime(),
        update_time:dateUtils.getTime()
    });

    newTopic.save(function(err,topic){
        if(err)
            callback(err);
        callback(null,topic);
    });
}

Topic.find = function(callback){
    topicModel.find({},null,{}).populate('user_id').exec(function(err,topics){
        if(err)
            callback(err);
        callback(err,topics);
    });
}

module.exports= Topic;