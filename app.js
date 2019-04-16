var connectedUsers = {
  users : {},
  set : function(id, user) {
    // console.log('--- set')
    this.users[id] = user ;
    // console.log(this.users) ;
  },
  get : function(id){
    // console.log('--- get')
    // console.log(this.users) ;
    return this.users[id] ;
  }
};

var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    indexRouter = require('./routes/index')(connectedUsers),
    usersRouter = require('./routes/users')(connectedUsers),
    loginRouter = require('./routes/login')(connectedUsers),
    mapRouter = require('./routes/map'),
    commentRouter = require('./routes/comment'),
    bodyParser = require('body-parser');
// var mapRouter = require('./routes/map');
// // var mapRouter = require('./routes/map');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/map' , mapRouter);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
app.use('/login', loginRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
// app.use('/map1', mapRouter);
app.use('/comment', commentRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
