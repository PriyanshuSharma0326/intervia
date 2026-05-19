const {
    createInterview,
    createInterviewQuestions,
    submitResponseToInterviewQuestion,
    findInterview,
    submitFinalScore,
    getAllInterviews,
    abandonInterview,
    resumeInterview,
} = require("../queries/interview");
const { getAllInterviewQuestionsByInterviewId } = require("../queries/question");

const {
    generateEvaluationForAnswer,
    generateInterviewQuestions
} = require("../services/ai");

async function handleGetAllInterviews(req, res) {
    try {
        const interviews = await getAllInterviews(req.user.id);

        if(interviews.length === 0) {
            return res.status(400).json({
                message: "You havent done any interviews yet",
            });
        }

        return res.status(200).json({
            message: "All Interviews",
            interviews: interviews,
        });
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: "Error fetching interviews",
            error: err
        });
    }
}

async function handleStartInterview(req, res) {
    try {
        const { role, difficulty, work_field } = req.body;

        const interview = await createInterview(req.user.id, role, difficulty, work_field);

        const questionsList = await generateInterviewQuestions({ role, difficulty, work_field });

        const savedQuestions = await createInterviewQuestions(interview.id, questionsList.questions);

        return res.status(200).json({
            message: "Interview initiated",
            interview,
            questions: savedQuestions,
        });
    }
    catch(err) {
        return res.status(500).json({
            message: "Error starting interview",
            error: err
        });
    }
}

async function handleSubmitAnswer(req, res) {
    try {
        const { question, answer } = req.body;
        const questionId = req.params.questionId;

        if (!question || !answer) {
            return res.status(400).json({
                message: "Question and answer are required",
            });
        }

        const { feedback, score } = await generateEvaluationForAnswer({ question, answer });

        const interview_question = await submitResponseToInterviewQuestion(questionId, answer, feedback, Number(score));

        return res.status(200).json({
            message: "Answer submitted",
            interview_question: interview_question,
        });
    }
    catch(err) {
        return res.status(500).json({
            message: "Error getting response from Groq ai",
            error: err
        });
    }
}

async function handleSubmitInterview(req, res) {
    try {
        const { score } = req.body;
        const interviewId = req.params.interviewId;

        const intvw = await findInterview(interviewId);

        if(!intvw) {
            return res.status(400).json({
                message: "Interview doesn't exist",
            });
        }

        if(intvw.status === 'completed') {
            return res.status(400).json({
                message: "Interview already completed",
            });
        }

        const interview = await submitFinalScore(score, interviewId);

        return res.status(200).json({
            message: "Interview successfully submitted",
            interview: interview,
        });
    }
    catch(err) {
        return res.status(500).json({
            message: "Error submitting interview",
        });
    }
}

async function handleAbandonInterview(req, res) {
    try {
        const interviewId = req.params.interviewId;

        const intvw = await findInterview(interviewId);

        if(!intvw) {
            return res.status(400).json({
                message: "Interview doesn't exist",
            });
        }

        const interview = await abandonInterview(interviewId);

        return res.status(200).json({
            message: "Interview abandoned",
            interview: interview,
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Error cancelling interview",
        });
    }
}

async function handleResumeInterview(req, res) {
    try {
        const interviewId = req.params.interviewId;

        const intvw = await findInterview(interviewId);

        if(!intvw) {
            return res.status(400).json({
                message: "Interview doesn't exist",
            });
        }

        const interview = await resumeInterview(interviewId);

        const questions = await getAllInterviewQuestionsByInterviewId(interviewId);

        return res.status(200).json({
            message: "Interview restarted",
            interview,
            questions: questions || [],
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Error cancelling interview",
        });
    }
}

async function handleGetInterviewDetails(req, res) {
    try {
        const interviewId = req.params.interviewId;

        const intvw = await findInterview(interviewId);

        if(!intvw) {
            return res.status(400).json({
                message: "Interview doesn't exist",
            });
        }

        const questions = await getAllInterviewQuestionsByInterviewId(interviewId);

        return res.status(200).json({
            message: "Interview found",
            interview: {
                data: intvw,
                questions: questions || [],
            },
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Error finding interview",
        });
    }
}

module.exports = {
    handleStartInterview,
    handleSubmitAnswer,
    handleSubmitInterview,
    handleGetAllInterviews,
    handleAbandonInterview,
    handleResumeInterview,
    handleGetInterviewDetails,
}
