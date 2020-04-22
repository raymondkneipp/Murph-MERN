const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 4000;

// Connect to database
connectDB();

// Initialize middleware
app.use(express.json());

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/murphs", require("./routes/api/murphs"));

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
