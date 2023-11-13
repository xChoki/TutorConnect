const mongoose = require("mongoose")
const { Schema } = mongoose

const FileSchema = new Schema({
  fileName: String,
  fileUrl: String,
})

const ProgressSchema = new Schema({
  progressFileId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  progressScore: Number,
  progressFile: FileSchema,
})

const StudentSchema = new Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studentName: { type: mongoose.Schema.Types.String, ref: "User" },
  studentProgress: [ProgressSchema],
})

const CourseSchema = new Schema({
  courseTutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseTutorName: { type: mongoose.Schema.Types.String, ref: "User" },
  courseName: String,
  courseStudents: [StudentSchema],
  courseDescription: String,
  courseCategory: String,
  courseExtrainfo: String,
  courseNeurodiv: Boolean,
  videoFiles: [FileSchema], // Add videoFiles as an array of FileSchema
  materialFiles: [FileSchema], // Add materialFiles as an array of FileSchema
  homeworkFiles: [FileSchema], // Add homeworkFiles as an array of FileSchema
})

const CourseModel = mongoose.model("Course", CourseSchema)

module.exports = CourseModel
