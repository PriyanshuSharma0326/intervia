const pool = require("../connection");

async function queryPool(query, values) {
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = {
    queryPool,
}
