const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DBConfigLink,
  ssl: {
    rejectUnauthorized: false,
  },
});
// Check database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  }
  console.log("Connected to the database");
  release(); // Release the client back to the pool
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client:", err.message);
  process.exit(1);
});

module.exports = pool;
