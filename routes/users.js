var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../model/user');

/**
 * 进入注册页面
 */
router.get('/reg',function(req,res){
  res.render('reg',{});
});

router.post('/reg',function(req,res){
  var user_name = req.body.user_name,
      password = req.body.password,
      password_re = req.body.password_repeat;
  //检验用户两次输入的密码是否一致
  if (password_re != password) {
    req.flash('error', '两次输入的密码不一致!');
    return res.redirect('/');//返回注册页
  }
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');

  var newUser = new User({
    user_name: req.body.user_name,
    password: password,
    password_repeat : req.body.password_repeat,
    email: req.body.email,
    score:0,
    status:1
  });
  //检查用户名是否已经存在
  User.get(newUser.user_name, function (err, user) {
    if (user) {
      req.flash('error', '用户已存在!');
      return res.redirect('/reg');//返回注册页
    }
    console.log("not exists ,add a new user");
    //如果不存在则新增用户
    newUser.save(function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');//注册失败返回主册页
      }
      req.session.user = user;//用户信息存入 session
      req.flash('success', '注册成功!');
      res.redirect('/');//注册成功后返回主页
    });
  });
});


/**
 * 使用用户名和密码登陆
 */
router.post('/login',function(req,res){
  var user_name = req.body.user_name,
      md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  User.checkUser(user_name,password,function (err, user) {
    if (user) {
      req.flash('success', '登陆成功!');
      req.session.user = user;
      return res.redirect('/');
    }else{
      req.flash('error','用户名或密码不正确，请重新输入!');
      return res.redirect('/');
    }
  });
});

router.post('/logout',function(req,res){
  req.flash('success', '退出成功!');
  req.session.user = null;
 return  res.redirect('/')
});


module.exports = router;
