var createError = require('http-errors');
var express = require('express');
var path = require('path');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose =require('mongoose')
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin')
const dashboardRouter = require('./routes/dashboard')
const pitchRouter = require('./routes/pitch')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admin-2',express.static(path.join(__dirname,'node_modules/startbootstrap-sb-admin-2')))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:true,
    cookie: {maxAge: 3600000 * 2}
}))
app.use(flash())
app.locals.baseURL = process.env.WEB_URI_DEV

// live
const uri = process.env.ATLAS_URI
// development
// const uri = process.env.ATLAS_URI_DEV
mongoose.connect(uri, {useNewUrlParser : true,useUnifiedTopology: true, useCreateIndex: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('Successfull connect MongoDB Atlas database');
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/pitch', pitchRouter)
app.use('/api/v1/dashboard', dashboardRouter)
app.use('/', adminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
