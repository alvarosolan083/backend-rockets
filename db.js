
const { Pool } = require('pg');

const pool = new Pool({
  user: 'roketuser',
  host: 'tarea.cv2quftjeoly.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'roket2024',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
