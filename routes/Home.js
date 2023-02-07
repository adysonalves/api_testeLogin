const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User.Controller');

router.get('/', UserController.ListarTodos);
router.post('/add', UserController.AddUser);
router.get('/del/:id?', UserController.removeUsers);


module.exports = router;