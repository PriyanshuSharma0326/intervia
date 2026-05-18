const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function generateInterviewQuestions({ role, difficulty }) {
    try {
        const prompt = `
            Generate 10 unique ${difficulty} level interview questions
            for a ${role} developer.

            Return ONLY valid JSON.

            Example:
            {
                "questions": [
                    "Question 1",
                    "Question 2"
                ]
            }
        `;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
        });

        const content =
            response.choices[0].message.content;

        const cleanedContent = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanedContent);
    }
    catch(err) {
        console.log("Error generating questions:", err);
        throw err;
    }
}

async function generateEvaluationForAnswer({
    question,
    answer,
}) {
    try {
        const prompt = `
            You are a technical interviewer.

            Evaluate the candidate's answer.

            Interview Question:
            ${question}

            Candidate Answer:
            ${answer}

            Return ONLY valid JSON in this format:

            {
                "feedback": "short feedback here",
                "score": 7
            }

            Rules:
            - feedback must be maximum 1 sentence
            - score must be integer between 1 and 10
            - no markdown
            - no explanation
        `;

        const response = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.3,
            });

        const content = response.choices[0].message.content;

        const cleanedContent = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        return JSON.parse(cleanedContent);
    }
    catch(error) {
        console.error(
            "Error generating evaluation:",
            error
        );

        throw error;
    }
}

module.exports = {
    generateInterviewQuestions,
    generateEvaluationForAnswer,
};
