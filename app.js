var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

var indexRouter = require("./routes/index");
var userRoutes = require("./modules/user/userRoutes");     // [ADICIONAR] 
var videoRoutes = require("./modules/video/videoRoutes");

var app = express();
var expressLayouts = require("express-ejs-layouts");


// view engine setup
app.set('views', path.join(__dirname, 'views/pages')); // Linha modificada
app.set("layout", path.join(__dirname, "views/layouts/main")); // Linha adicionada
app.use(expressLayouts); // Linha adicionada
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ 
  secret: process.env.SESSION_SECRET || 'sua frase secreta bem longa e aleatória aqui',
  resave: false,
  saveUnitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24} //1dia
}));
app.use("/", indexRouter);
app.use("/", userRoutes);
app.use("/", videoRoutes); //Usa as rotas de vídeo

app.use(flash());

app.use((req, res, next) => { 
  res.locals.messages = req.flash();
  res.locals.user = req.session.user || null; // Nova linha adicionada - middleware globaliza o objeto user e configura o connect-flash
  next();
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/", userRoutes); // [ADICIONAR] Usa as rotas de usuário descentralizadas

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

//Importa as associações para garantir que sejam carregadas
require("./config/associations");

//testa a conexão com o MySQL
const sequelize = require('./config/database');

sequelize.sync({alter:true})
  .then(()=> console.log("Banco de dados sincronizado!"))
  .catch(err => console.error("Erro ao sincronizar banco:", err));

/*
// testa a conexão com o MySQL
sequelize.authenticate()
  .then( ()=> console.log('Conexão com MySQL ok!') )
  .catch( err => console.error('Erro de conexão',err)  );
*/

module.exports = app;
