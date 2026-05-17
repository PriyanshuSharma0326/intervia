const { Router } = require('express');
const { handleLogin, handleSignup } = require('../controllers/auth');

const router = Router();

router.post('/login', handleLogin);

router.post('/register', handleSignup);

module.exports = router;
