require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./src/config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET"],
    credentials: true,
  })
);

const analyticsRouter = require("./src/routes/analytics.routes");
connectDb();

app.use("/api/v1/analytics", analyticsRouter);
app.get("/", (req, res) => {
  res.send("This is a deployment test");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});

module.exports = app;
