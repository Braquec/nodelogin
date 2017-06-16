//all tools
var express = require('express');
var app = express();
var port = 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var morgan = require('morgan');

app.use(morgan('dev'));