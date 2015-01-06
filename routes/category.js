/**
 * Created by zhang_renyang on 14/12/31.
 */
var express = require('express');
var router = express.Router();
var Category = require('../model/category');

/**分页查询栏目*/
router.get('/list',function(req,res){
    Category.find(function(err,categories){
        res.render('category',{
            user: req.session.user,
            categories:categories
        });
    });
});




/**增加A栏目*/
router.post('/add',function(req,res){
    var category = {
        name:req.body.name,
        type:req.body.type,
        parent_id:req.body.parent_id
    }
    var newCategory = new Category(category);
    newCategory.save(function(err,category){
        console.log(category);
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }
        req.flash('success',"添加成功!");
        res.redirect('/category/list');
    });
});

/**转入编辑栏目的页面*/
router.get('/edit',function(req,res){
    res.end('get category edit');
});

/**编辑栏目*/
router.post('/edit',function(req,res){
    res.end('post category edit');
});

/**删除栏目*/
router.post('/delete',function(req,res){
    res.end('post category delete');
});
module.exports = router;