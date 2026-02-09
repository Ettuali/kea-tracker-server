const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mountRoutes = require("./routes/routes");

const app = express();

app.use(cors());

// Body parsers (ADD BOTH)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount all routes
mountRoutes(app);

// Root test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API Running...");
});

// START SERVER
const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
