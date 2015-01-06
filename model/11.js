/**
 * Created by zhufengpeixun on 15/1/5.
 */
/*   function Catoregory(name){
           this.name=name;

    }

Catoregory.prototype.aa= function () {
    console.log(this.name);
}
Catoregory.list=function(){

    console.log(this);
}

Catoregory.list2=function(){
    console.log(222)
}
var aer=new Catoregory('lili');
aer.aa();
Catoregory.list()
var ber =new Catoregory('yanyan')
ber.aa();
Catoregory.list();*/
/*f=function(req,res,nex){

}
function f(req,res,next){

}*/
function fn1(a,b){
    return a+b;
}
function aa(q,cb){
    console.log(cb(2,3))
}
aa(2,fn1)