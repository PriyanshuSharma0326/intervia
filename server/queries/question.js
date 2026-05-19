const pool = require("../connection");
const { queryPool } = require("../lib/utils");

async function getAllInterviewQuestionsByInterviewId(id) {
    const query = `
        SELECT *
        FROM interview_questions
        WHERE interview_id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows;
}

module.exports = {
    getAllInterviewQuestionsByInterviewId,
}
