/**
 * Created by zhang_renyang on 14/12/31.
 */
var express = require('express');
var router = express.Router();
var Topic = require('../model/topic');

router.get('/view',function(req,res){
    res.render('description',{});
});

/**
 *查询主题
 */
router.get('/list',function(req,res,next){
    Topic.find(function(err,topics){
        if(err){
           next(err);
        }else{
            res.render('topic',{
                user: req.session.user,
                topics:topics});
        }

    });
});



/**
 *增加文文章
 */
router.post('/list',function(req,res,next){
   var topic = {
    articleTitle : req.body.articleTitle,
    functionDescription : req.body.functionDescription,
    articleExamples : req.body.articleExamples,
    jobInterview : req.body.jobInterview,
    topic_id : req.body.topic_id
   }
    console.log(topic);
   var newTopic = new Topic(topic);
   newTopic.save(function(err){
       if(err){
          next(err);
       }else{
           res.redirect('/topic/list');

       }
    });
});

/**
 *跳转到编辑主题页面
 */
router.get('/edit',function(){
  res.end('get topic edit');
});

/**
 *编辑主题
 */
router.post('/edit',function(){
  res.end('post topic edit');
});

/**
 *删除主题
 */
router.post('/delete',function(){
  res.end('post topic delete');
});

module.exports = router;