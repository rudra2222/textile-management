import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import productionRoutes from "./routes/productionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/productions", productionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
    res.send("Textile API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
