const { Router } = require('express');
const { 
    handleStartInterview, 
    handleSubmitAnswer, 
    handleSubmitInterview, 
    handleGetAllInterviews, 
    handleAbandonInterview, 
    handleResumeInterview,
    handleGetInterviewDetails
} = require('../controllers/interview');

const router = Router();

router.get('/all', handleGetAllInterviews);

router.post('/start', handleStartInterview);

router.get('/:interviewId', handleGetInterviewDetails);

router.put('/answer/:questionId', handleSubmitAnswer);

router.put('/submit/:interviewId', handleSubmitInterview);

router.put('/abandon/:interviewId', handleAbandonInterview);

router.put('/resume/:interviewId', handleResumeInterview);

module.exports = router;
