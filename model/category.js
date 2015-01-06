/**
 * Created by zhang_renyang on 15/1/3.
 */

var dateUtils = require('../utils/dateUtils');
var categoryModel = require('../schema/category');


function Category(category) {
    this.name = category.name;
    this.parent_id = category.parent_id;
    this.type = category.type;
};

Category.prototype.save = function(callback) {
    //要存入数据库的用户信息文档
    var category = {
        name: this.name,
        parent_id: this.parent_id,
        type: this.type,
        create_time:dateUtils.getTime(),
        update_time:dateUtils.getTime()
    };
    var newCategory = new categoryModel(category);
    newCategory.save(function(err,category){
        console.error(err);
        if(err)
            return callback(err);
        callback(null,category);
    });

};
//查找记录
Category.find = function(callback){
    categoryModel.find({type:0},null,{}).exec(function(err,categories){
        if(err){
            return callback(err);
        } else{
            console.log(categories);
            callback(null,categories);
        }


    });

}

Category.tree = function(callback){
    categoryModel.find({type:0},null,{}).exec(function(err,categories){
        if(err){
            callback(err);
        }else{
            patchCategories(categories);
            callback(null,categories);
        }
    });

}

function patchCategories(categories){
    if(categories && categories.length){
        for(var i=0;i<categories.length;i++){
            var category = categories[i];
            categoryModel.find({parent_id:category._id},null,{}).populate('parent_id').exec(function(err,subCategories){
                patchCategories(subCategories);
                category.children = subCategories;
            });
        }
    }
}
module.exports = Category;

