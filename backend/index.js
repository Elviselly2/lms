const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const lessonRouter = require("./routes/lessonRoutes");
const courseRouter = require("./routes/courseRoutes");
const progressRouter = require("./routes/progressRoutes");
const sequelize = require("./config/db");

// Test database connection
sequelize.sync()
.then(() => console.log("PostgreSQL connected"))
.catch((err) => console.log("DB error:", err));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/courses", courseRouter);
app.use("/api/progress", progressRouter);

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});