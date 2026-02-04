import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import { swaggerUi, swaggerDocs } from "./openapi/index.js"

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://bloodbank-management-system.vercel.app",
    "https://bloodbank-management-system-zemoo03.vercel.app",
    /\.vercel\.app$/  // Allow all Vercel preview URLs
  ],
  credentials: true,
}));

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 🏠 Root route - API status
app.get("/", (req, res) => {
  res.json({
    message: "🩸 Blood Bank Management System API",
    status: "Running",
    author: "Pratik Ohol",
    endpoints: {
      docs: "/api/doc",
      auth: "/api/auth",
      donor: "/api/donor",
      admin: "/api/admin",
      facility: "/api/facility",
      bloodLab: "/api/blood-lab",
      hospital: "/api/hospital"
    }
  });
});

// 🧩 Routes

app.use("/api/auth", authRoutes);


app.use("/api/donor", donorRoutes);

app.use("/api/facility", facilityRoutes);

app.use("/api/admin", adminRoutes);



import bloodLabRoutes from "./routes/bloodLabRoutes.js";
app.use("/api/blood-lab", bloodLabRoutes);


import hospitalRoutes from "./routes/hospitalRoutes.js";
app.use("/api/hospital", hospitalRoutes);


// 🗄️ DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
