var express = require('express');
var router = express.Router();

// Rota para a pagina inicial
router.get('/', function (req, res, next) {
   res.render('landing', { title: 'Videos Curtos e Engajadores', layout: false });
});

module.exports = router;
