const mongoose = require('mongoose')
const { Schema } = mongoose

const StudentSchema = new Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    student_name: { type: mongoose.Schema.Types.String, ref: 'User' },
    student_progress: Number,
})

const FileSchema = new Schema({
    fileName: String,
    fileUrl: String,
});

const CourseSchema = new Schema({
    course_tutor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course_tutor_name: { type: mongoose.Schema.Types.String, ref: 'User' },
    course_name: String,
    course_students: [StudentSchema],
    course_description: String,
    course_category: String,
    course_extrainfo: String,
    course_neurodiv: Boolean,
    videoFiles: [FileSchema],    // Add videoFiles as an array of FileSchema
    materialFiles: [FileSchema], // Add materialFiles as an array of FileSchema
    homeworkFiles: [FileSchema], // Add homeworkFiles as an array of FileSchema
})

const CourseModel = mongoose.model('Course', CourseSchema)

module.exports = CourseModel
