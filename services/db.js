const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}
async function query1(sql) {
  const rows = await pool.execute(sql);

  return rows;
}
module.exports = {
  query,
  query1
}
