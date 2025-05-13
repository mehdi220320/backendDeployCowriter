require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require("./routes/roomRoutes");
const bookRoutes = require("./routes/bookRoutes");
const textRoutes = require("./routes/text.routes");
const chapterRoutes = require("./routes/chapterRoutes");

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {

    })
    .then(() => console.log("✅ MongoDB is connected!"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/test", (req, res) => {
    res.send("✅ Test route is working!");
});

app.get("/", (req, res) => {
    res.send("📖 CoWriter API is running...");
});
app.use("/users", userRoutes);
app.use('/auth', authRoutes);
app.use("/rooms", roomRoutes);
app.use("/books", bookRoutes);
app.use("/chapters", chapterRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api",textRoutes);

module.exports = app;
