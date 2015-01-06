/**
 * Created by zhang_renyang on 15/1/3.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var Category = require('../model/Category');

router.get('/',function(req,res){
    Category.tree(function(err,categories){

        res.render('index',{
            categories:categories,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()});
    });

});

router.get('/admin',function(req,res){
    res.render('admin',{user: req.session.user,
         success: req.flash('success').toString(),
         error: req.flash('error').toString()
        }
    );
});
module.exports=router;
router.get('/article',function(req,res){
    res.render('article',{});

});