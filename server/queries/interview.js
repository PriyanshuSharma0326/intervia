const pool = require("../connection");
const { queryPool } = require("../lib/utils");

async function createInterview(id, role, difficulty) {
    const query = `
        INSERT INTO interviews (user_id, role, difficulty)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    return (
        await queryPool(query, [id, role, difficulty])
    );
}

async function createInterviewQuestions(interviewId, questions) {
    const values = [];
    const placeholders = [];

    questions.forEach((question, index) => {
        const baseIndex = index * 3;

        placeholders.push(
            `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3})`
        );

        values.push(
            interviewId,
            question,
            index + 1
        );
    });

    const query = `
        INSERT INTO interview_questions (
            interview_id,
            question,
            question_order
        )
        VALUES ${placeholders.join(", ")}
        RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows;
}

async function submitResponseToInterviewQuestion(
    id,
    answer,
    feedback,
    score
) {
    const query = `
        UPDATE interview_questions
        SET
            answer = $1,
            feedback = $2,
            evaluation_score = $3,
            answered_at = NOW()
        WHERE id = $4
        RETURNING *
    `;

    return (
        await queryPool(query, [
            answer,
            feedback,
            score,
            id
        ])
    );
}

async function findInterview(id) {
    const query = `
        SELECT *
        FROM interviews
        WHERE id = $1
    `;

    return (
        await queryPool(query, [id])
    );
}

async function submitFinalScore(score, id) {
    const query = `
        UPDATE interviews
        SET 
            score = $1,
            completed_at = NOW(),
            status = 'completed'
        WHERE id = $2
        RETURNING *
    `;

    return (
        await queryPool(query, [ score, id ])
    );
}

async function getAllInterviews(id) {
    const query = `
        SELECT *
        FROM interviews
        WHERE user_id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows;
}

async function abandonInterview(id) {
    const query = `
        UPDATE interviews
        SET 
            status = 'abandoned'
        WHERE id = $1
        RETURNING *
    `;

    return (
        await queryPool(query, [ id ])
    );
}

async function resumeInterview(id) {
    const query = `
        UPDATE interviews
        SET 
            status = 'active'
        WHERE id = $1
        RETURNING *
    `;

    return (
        await queryPool(query, [ id ])
    );
}

async function getAllInterviewQuestions(id) {
    const query = `
        SELECT *
        FROM interview_questions
        WHERE interview_id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows;
}

module.exports = {
    createInterview,
    createInterviewQuestions,
    submitResponseToInterviewQuestion,
    findInterview,
    submitFinalScore,
    getAllInterviews,
    abandonInterview,
    resumeInterview,
    getAllInterviewQuestions,
}
