const mongoose = require('mongoose')
const { Schema } = mongoose

const ProgressSchema = new Schema({
    progressFileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progressScore: Number,
})

const StudentSchema = new Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    student_name: { type: mongoose.Schema.Types.String, ref: 'User' },
    student_progress: [ProgressSchema],
})

const FileSchema = new Schema({
    fileName: String,
    fileUrl: String,
});

const CourseSchema = new Schema({
    courseTutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courseTutorName: { type: mongoose.Schema.Types.String, ref: 'User' },
    courseName: String,
    courseStudents: [StudentSchema],
    courseDescription: String,
    courseCategory: String,
    courseExtrainfo: String,
    courseNeurodiv: Boolean,
    videoFiles: [FileSchema],    // Add videoFiles as an array of FileSchema
    materialFiles: [FileSchema], // Add materialFiles as an array of FileSchema
    homeworkFiles: [FileSchema], // Add homeworkFiles as an array of FileSchema
})

const CourseModel = mongoose.model('Course', CourseSchema)

module.exports = CourseModel
