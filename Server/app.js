import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import citizenRoutes from "./routes/citizen.routes.js";
import issueRoutes from "./routes/issue.routes.js";
import authRoutes from "./routes/auth.routes.js";
import authorityRoutes from "./routes/authority.routes.js";
import authorityIssueRoutes from "./routes/authorityIssue.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);


// =========================
// MIDDLEWARE
// =========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// =========================
// HEALTH CHECK
// =========================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "NagarDrishti API is running",
    });
});


// =========================
// ROUTES
// =========================


app.use("/api/auth", authRoutes);
app.use("/api/authority", authorityRoutes);
app.use("/api/citizens", citizenRoutes);
app.use("/api/issues", issueRoutes);
app.use(
    "/api/authority/issues",
    authorityIssueRoutes
);

// =========================
// 404 HANDLER
// =========================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});


// =========================
// GLOBAL ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
    console.error("Global error:", err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
});


// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();