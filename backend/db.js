const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Wrapper to mimic mysql2 interface: returns [rows, fields]
const query = async (sql, params) => {
  const result = await pool.query(sql, params);
  return [result.rows, result.fields];
};

module.exports = { query };
