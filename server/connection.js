const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => {
        console.log("Connected with Supabase PostgreSQL")
    })
    .catch((error) => {
        console.log("Database connection error:", error.message)
    });

module.exports = pool;
