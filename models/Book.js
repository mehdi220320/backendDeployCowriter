const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    description:String,
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    lastChapterDeclared: { type: Boolean, default: false },
    coverImage: {
        path: String,
        contentType: String,
    },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);