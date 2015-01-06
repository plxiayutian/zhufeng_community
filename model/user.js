/**
 * Created by zhang_renyang on 15/1/3.
 */
var crypto = require('crypto');
var dateUtils = require('../utils/dateUtils');
var settings = require('../settings');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
        user_name:String,
        password:String,
        password_repeat:String,
        email:String,
        score:Number,
        status:Number,
        avatar:String,
        create_time:Date,
        update_time:Date
    },{collection:'user'}),
    ObjectId=Schema.ObjectId;
var userModel = mongoose.model('User',userSchema);


function User(user) {
    this.user_name = user.user_name;
    this.password = user.password;
    this.password_repeat = user.password_repeat;
    this.email = user.email;
    this.type = user.type;
    this.score = user.score;
    this.status = user.status;
};


//存储用户信息
User.prototype.save = function(callback) {
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
        avatar = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
    //要存入数据库的用户信息文档
    var user = {
        user_name: this.user_name,
        password: this.password,
        password_repeat :this.password_repeat,
        email: this.email,
        score:0,
        status:1,
        avatar: avatar,
        create_time:dateUtils.getTime()
    };
    var newUser = new userModel(user);
    newUser.save(function(err,user){
        if(err)
          return callback(err);
        callback(null,user);
    });
};

//读取用户信息
User.get = function(user_name, callback) {
    userModel.findOne({user_name:user_name},function(err,user){
        if(err){
            return callback(err);
        }
        callback(null,user);
    });
};

//读取用户信息
User.checkUser = function(user_name,password, callback) {
    userModel.findOne({user_name:user_name,password:password},function(err,user){
        if(err){
            return callback(err);
        }
        callback(null,user);
    });
};
module.exports = User;
