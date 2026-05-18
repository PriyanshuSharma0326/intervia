const { Router } = require('express');
const { 
    handleStartInterview, 
    handleSubmitAnswer, 
    handleSubmitInterview, 
    handleGetAllInterviews, 
    handleAbandonInterview, 
    handleResumeInterview
} = require('../controllers/interview');

const router = Router();

router.post('/start', handleStartInterview);

router.put('/answer/:questionId', handleSubmitAnswer);

router.put('/submit/', handleSubmitInterview);

router.get('/all', handleGetAllInterviews);

router.put('/abandon/:interviewId', handleAbandonInterview);

router.put('/resume/:interviewId', handleResumeInterview);

module.exports = router;
