const mongoose = require('mongoose')
const { Schema } = mongoose;

const CourseSchema = new Schema({
    course_tutor_id: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    course_tutor_name: {type:mongoose.Schema.Types.String, ref:'User'},
    course_name: String,
    course_students: {},
    course_description: String,
    course_category: String,
    course_extrainfo: String,
    course_neurodiv: String,
})

const CourseModel = mongoose.model('Course', CourseSchema)

module.exports = CourseModel