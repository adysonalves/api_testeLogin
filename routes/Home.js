const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User.Controller');
const Autenticacao = require('../controllers/AutenticacaoController');

router.get('/', UserController.ListarTodos);
router.post('/add', UserController.AddUser);
router.get('/del/:id?', Autenticacao.verificaToken, UserController.removeUsers);
router.post('/login', UserController.loginUser);


module.exports = router;