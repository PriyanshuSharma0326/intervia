const { queryPool } = require("../lib/utils");

async function createUser(name, email, password) {
    const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    return (
        await queryPool(query, [name, email, password])
    );
}

async function findUser(email) {
    const query = `
        SELECT *
        FROM users
        WHERE email = $1
    `;

    return (
        await queryPool(query, [email])
    );
}

module.exports = {
    createUser,
    findUser,
}
