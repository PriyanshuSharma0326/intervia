const { Router } = require('express');
const { handleLogin, handleSignup, handleLogout, handleVerifyUser, handleResetUserPassword } = require('../controllers/auth');

const router = Router();

router.post('/login', handleLogin);

router.post('/logout', handleLogout);

router.post('/register', handleSignup);

router.post('/forgot-password', handleVerifyUser);

router.post('/reset-password', handleResetUserPassword);

module.exports = router;
