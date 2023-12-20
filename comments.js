// Create web server
// 
// This web server is used to provide the public interface for the
// application. The web server is responsible for serving the static
// content of the application, as well as handling the API requests
// from the client. The web server is based on the Express framework.
// 
// The web server is also responsible for handling the OAuth
// authentication requests from the client. The OAuth authentication
// is based on the Passport framework.
// 
// The web server is also responsible for handling the socket.io
// requests from the client. The socket.io requests are used to
// provide real-time updates to the client.
// 
// The web server is also responsible for handling the MongoDB
// requests from the client. The MongoDB requests are used to
// provide persistent storage for the application.
// 

// Required modules
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var passport = require('passport');
var util = require('util');
var flash = require('connect-flash');
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express);
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var _ = require('underscore');

// Required files
var config = require('./config');
var User = require('./models/user');
var Account = require('./models/account');
var Log = require('./models/log');
var Message = require('./models/message');
var Room = require('./models/room');

// Connect to MongoDB
mongoose.connect(config.mongo.uri);
var db = mongoose.connection;

// MongoDB error handling
db.on('error', console.error.bind(console, 'connection error:'));

// MongoDB connection success
db.once('open', function callback() {
  console.log('MongoDB connection successful');
});

// Configure Express
app.configure(function() {
  app.set('port', config.web.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  
  // Parse cookies
  app.use(express.cookieParser());
});