/**
 * Created by zhang_renyang on 15/1/3.
 */

var dateUtils = require('../utils/dateUtils');
var settings = require('../settings');
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    categorySchema = new Schema({
        name:String,
        parent_id:String,
        type:Number,

        create_time:Date,
        update_time:Date
    },{collection:'category'});

var categoryModel = mongoose.model('Category',categorySchema);


module.exports = categoryModel;

