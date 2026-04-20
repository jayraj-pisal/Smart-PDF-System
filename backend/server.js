const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const formRoutes = require("./routes/forms");
const submitRoutes = require("./routes/submit");

const app = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : true;

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/filled", express.static(path.join(__dirname, "filled")));

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/submit", submitRoutes);

const PORT = process.env.PORT || process.env.BACKEND_PORT || 3001;
const HOST = process.env.RAILWAY_ENVIRONMENT ? "0.0.0.0" : "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Backend server running on ${HOST}:${PORT}`);
});
