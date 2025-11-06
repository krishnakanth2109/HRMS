import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import Routes
import noticeRoutes from "./routes/noticeRoutes.js";
import holidayRoutes from "./routes/holidayRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/notices", noticeRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/employees", employeeRoutes);

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
