/**
 * Created by zhang_renyang on 14/12/31.
 */

var express = require('express');
var router = express.Router();
var Reply = require('../model/Reply');

/**
 * 分页查询回复
 */
router.get('/pageQuery',function(req,res){
    res.end('get reply pageQuery');
});
/**
 *跳转到增加回复
 */
router.get('/add',function(){
    res.end('get reply add');
});
/**
 *增加回复
 */
router.post('/add',function(req,res){
    var reply = {
        content:req.body.content
    }
    var newReply = new Reply(reply);
    newReply.save(function(err,reply){
        if(err){
            res.redirect('/');
        }else{
            res.redirect('/');
        }
    });

});

/**
 *删除回复
 */
router.post('/delete',function(){
    res.end('post reply delete');
});
module.exports = router;