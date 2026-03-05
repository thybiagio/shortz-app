var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bem vindo!' });
  console.log("app inicializado e respondendo")
});

// /register - rota
// 'register' - register.ejs
router.get('/register', function(req, res, next){ 
  res.render('register', { title : 'Criar conta'});
})

const userController = require('../modules/user/userController');
//Rota que processa o formulário de cadastro
router.post('/register', userController.register);

module.exports = router;
