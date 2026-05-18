const { getAllInterviewQuestions } = require("../queries/question");

async function handleGetAllQuestions(req, res) {
    try {
        const questions = await getAllInterviewQuestions();

        if(questions.length === 0) {
            return res.status(400).json({
                message: "No questions available",
            });
        }

        return res.status(200).json({
            message: "All Interview questions",
            questions: questions,
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Error getting interview questions",
        });
    }
}

module.exports = {
    handleGetAllQuestions,
}
