const mongoose = require("mongoose")
const { Schema } = mongoose

const FileSchema = new Schema({
  fileName: String,
  fileUrl: String,
})

const StudentInfo = new Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studentName: { type: mongoose.Schema.Types.String, ref: "User" },
  studentEmail: { type: mongoose.Schema.Types.String, ref: "User" },
  studentDateofBirth: { type: mongoose.Schema.Types.Date, ref: "User" },
  // studentSpecialities: [String],
})

const ReviewerInfo = new Schema({
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewerName: { type: mongoose.Schema.Types.String, ref: "User" },
  reviewerDate: { type: Date },
})

const ApplicationSchema = new Schema({
  applicationStudentInfo: StudentInfo,
  applicationDate: { type: Date, default: Date.now },
  applicationDescription: String,
  applicationExtraInfo: String,
  applicationGradesFile: FileSchema, // PDF file.
  applicationRegularFile: FileSchema, // PDF file.
  applicationState: String, // En proceso, aceptada, rechazada.
  applicationReviewer: ReviewerInfo,
})

const ApplicationModel = mongoose.model("Applications", ApplicationSchema)

module.exports = ApplicationModel
