const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    title:{type:String,default:"Chapter "+this.chapterNumber},
    chapterNumber: { type: Number, required: true },
    confirmedVersion: { type: mongoose.Schema.Types.ObjectId, ref: "ChapterVersion", default: null },
    chapterDeadline:{type:Date},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Chapter", ChapterSchema);
