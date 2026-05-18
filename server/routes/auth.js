const { Router } = require('express');
const { handleLogin, handleSignup, handleLogout } = require('../controllers/auth');

const router = Router();

router.post('/login', handleLogin);

router.post('/logout', handleLogout);

router.post('/register', handleSignup);

module.exports = router;
