const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");

const mountRoutes = require("./routes/routes");

const app = express();

app.use(cors());

// Body parsers (ADD BOTH)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount all routes
mountRoutes(app);

// Root test route (optional but useful)
app.get("/db-check", async (req, res) => {
  const result = await pool.query(`
    SELECT current_database(), current_user
  `);
  res.json(result.rows);
});

// START SERVER
const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
