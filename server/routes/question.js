const { Router } = require('express');
const { handleGetAllQuestions } = require('../controllers/question');

const router = Router();

router.get('/all', handleGetAllQuestions);

module.exports = router;
