var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cors = require('cors');


var mongoose = require('mongoose');

var routes = require('./routes/user.routes');
//var users = require('./routes/user.routes')(express);
var products = require('./config/products.config');
var User = require('./config/user.config')


//Database
var database = require('./config/database.config');
//connect to mongo database
//connect to databas
mongoose.connect(database.url);
//check if connected
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('connected to database')
    /*Elastic seach*/
    var products = require('./models/products.model');
    //clear all indexes
    products.esTruncate(function(err) {

    });
    //Create mapping
    products.createMapping(function(err, mapping) {
        if (err) {
            console.log('error creating mapping (you can safely ignore this)');
            console.log(err);
        } else {
            console.log('mapping created!');
            console.log(mapping);
        }
    });
    /*Index all documents*/
    var stream = products.synchronize()
    var count = 0;

    stream.on('data', function(err, doc) {
        count++;
    });
    stream.on('close', function() {
        console.log('indexed ' + count + ' documents!');
    });
    stream.on('error', function(err) {
        console.log(err);
    });

});
//mongoose.connect(database.url)

var app = express();
var port = 3000;
//var port = 9222;
app.set('port', port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__odirname + '/public/favicon.ico'));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
})); // get information from html forms
//app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(path.join(__dirname, 'public')));

//Passport set up
app.use(session({
    secret: 'olamilepatricioeyasmincordeiro',
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
require('./auth/passport.auth')(passport);
require('./routes/user.routes')(app, express, passport, User);
require('./routes/products.routes')(app, express, products);
app.use('/', routes);
//app.use('/', users);
//app.use('/', produtos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port);
//app.on('error', onError);
console.log('listening on port:', port);

module.exports = app;
