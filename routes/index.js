var express = require('express');
var router = express.Router();
const userController = require('../modules/user/userController');

// Rota para a página inicial 
router.get('/', function (req, res, next) {
   res.render('index', { title: 'Vídeos Curtos e Engajadores' });
});

// Rota para exibir o formulário de cadastro
router.get('/register', (req, res) => {
   res.render('register', { title: 'Criar Conta' });
});

// Rota que processa o formulário de cadastro
router.post('/register', userController.register);

// Rota para exibir o formulário de login
router.get('/login', (req, res) => {
   res.render('login', { title: 'Entrar' });
});

module.exports = router;