//all tools
var express = require('express');
var app = express();
var port = 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');


//database configuration
mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration

// set up express app
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies need for auth
app.use(bodyParser()); //get information for html forms
 
app.set('view engine', 'ejs'); //set up ejs for templating


//req for passport
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); //session secret
app.use(passport.initialize()); 
app.use(passport.session()); //persistend login sessions
app.use(flash()); //connect-flash for flash messages stored in session


require('./app/routes.js')(app, passport);//load routes and pass in our app and fully configures passport

//start 
app.listen(port);