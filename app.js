const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const util = require('util');
const cors = require('cors');
const path = require('path')
const session = require('express-session');


const routes = require('./router/main');
const emailInfo = require('./router/emailInfo');
const calendarInfo = require('./router/calendarInfo');

const about = require('./router/main');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname + '/.env'})
}

const app = express();

//const APPID = `${process.env.CLIENT_ID}`;
//const APPSECRET = `${process.env.CLIENT_SECRET}`;

//set up views with ejs
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


global.Nylas = require('nylas');

Nylas.config({
   appId: process.env.CLIENT_ID,
   appSecret: process.env.CLIENT_SECRET
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'))
app.use(cors());

app.use(session(
	{secret:process.env.SECRET,
	saveUninitialized: true,
	resave:true
  }
));


app.use(express.static(path.join(__dirname, 'public')));

function checkAuth(req, res, next) {
  if (!req.session.token) res.redirect('/');
  next();
}

app.use('/', routes);
app.use('/emailInfo', checkAuth, emailInfo);
app.use('/about', checkAuth, routes);
app.use('/calendarInfo', checkAuth, calendarInfo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});




const hostname = '127.0.0.1'
const port = process.env.PORT || 3000;


// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
module.exports = app;
