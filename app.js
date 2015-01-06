var path = require('path');

var express = require('express');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multer  = require('multer');
var index = require('./routes/index');
var users = require('./routes/users');
var category = require('./routes/category');
var topic = require('./routes/topic');
var reply = require('./routes/reply');
var settings = require('./settings');
var mongoose = require('mongoose');
mongoose.connect(settings.mongoose);

var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(logger({stream: accessLog}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
  dest: './public/images',
  rename: function (fieldname, filename) {
    return filename;
  }
}));
app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',index);
app.use('/users', users);
app.use('/category',category);
app.use('/topic',topic);
app.use('/reply',reply);



/*app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});*/

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});