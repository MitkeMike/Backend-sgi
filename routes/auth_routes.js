const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth_controller');

router.post('/login', auth_controller.login_usuario);

module.exports = router;