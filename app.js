var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

// 🔧 IMPORTANTE: carregar banco e associações ANTES de qualquer rota
const sequelize = require('./config/database');
require("./config/associations");

var indexRouter = require("./routes/index");
var userRoutes = require("./modules/user/userRoutes");
var videoRoutes = require("./modules/video/videoRoutes");
var likeRoutes = require("./modules/like/likeRoutes");
var commentRoutes = require("./modules/comment/commentRoutes");

var app = express();
var expressLayouts = require("express-ejs-layouts");

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set("layout", path.join(__dirname, "views/layouts/main"));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ 
  secret: process.env.SESSION_SECRET || 'sua frase secreta bem longa e aleatória aqui',
  resave: false,
  saveUninitialized: false, // 🔧 corrigido (estava escrito errado)
  cookie: { maxAge: 1000 * 60 * 60 * 24}
}));

app.use(flash());

// middleware global
app.use((req, res, next) => { 
  res.locals.messages = req.flash();
  res.locals.user = req.session.user || null;
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ ROTAS (sem duplicação)
app.use("/", indexRouter);
app.use("/", userRoutes);
app.use("/", videoRoutes);
app.use("/", likeRoutes);
app.use("/", commentRoutes);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// 🔧 sincronização do banco
sequelize.sync({ alter: true })
  .then(() => console.log("Banco de dados sincronizado!"))
  .catch(err => console.error("Erro ao sincronizar banco:", err));

module.exports = app;