/*    IMPORTS AND DECLARATIONS
 *    These are the imports and declaration in this file */

/* EXPRESSJS
 * This is what we are using to code the API */
const express = require('express')
const router = express.Router()
router.use(express.json()) // This is used to parse every JSON for express usage
router.use(express.urlencoded({ extended: true }))

/* Dotenv
 * Dependency used to read .env files, in NODE v20.6.0 it is integrated, but we are using v18.17.1LTS and it is not */
require('dotenv').config()

/* JSONWebToken
 * Self-contained way for securely transmitting information between parties as a JSON object*/
const jwt = require('jsonwebtoken') // import
const jwtSecret = process.env.JWT_SECRET // jwt secret token, it is randomly typed

/* Mongoose
 * It is used to connect to a MongoDB database
 * the password is WdiVlejzjG8dwuBt */
const { default: mongoose } = require('mongoose') // import
mongoose.connect(process.env.MONGO_URL) // .env file that has access token to MongoDB Atlas
// Mongoose models
const Application = require('../models/Application') // Model for Applications
const Course = require('../models/Course') // Model for Courses

/* Cookieparser
 * Parse and handle HTTP cookies that are sent between the client and the server.  */
const cookieParser = require('cookie-parser') // import
router.use(cookieParser()) // This is to create an instance of the cookieparser

//verify
const { verifyToken } = require('./../middleware/authHandler')

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*     /student/cursos
 *     This endpoint handles cursos, when it succeeded, validates the information and uses get to receive the courses data*/
router.get('/courses', async (req, res) => {
  const { token } = req.cookies

  try {
    const userData = await verifyToken(token)
    const courses = await Course.find()
    res.json(courses)
  } catch (err) {
    console.error('Error:', err)
    res.status(401).json({ message: 'Access denied' })
  }
})

router.get('/courses/registered', async (req, res) => {
  const { token } = req.cookies

  try {
    const userData = await verifyToken(token)

    Course.find({ 'courseStudents.studentId': userData.id })
      .then((courses) => {
        if (courses.length > 0) {
          // Courses with the user ID in courseStudents.studentId were found
          // console.log('Found courses:', courses);
          res.json(courses)
        } else {
          // No courses found with the specified user ID
          // console.log('No courses found.');
          return res.status(404).json('Student not found in the course')
        }
      })
      .catch((err) => {
        console.error(err)
        // Handle the error
      })
  } catch (err) {
    console.error('Error:', err)
    res.status(401).json({ message: 'Access denied' })
  }
})

router.put('/course/register/:id', async (req, res) => {
  try {
    const { token } = req.cookies
    const { id } = req.params

    const userData = await verifyToken(token)
    const courseDoc = await Course.findById(id)

    // Get the current array of students or initialize an empty array if it doesn't exist
    const courseStudents = courseDoc.courseStudents || []

    // Check if the current user is already registered
    const isUserRegistered = courseStudents.some((student) => student.studentId === userData.id)

    if (isUserRegistered) {
      return res.status(400).json('El estudiante ya está registrado en este curso.')
    }

    // Add the new student to the array
    courseStudents.push({
      studentId: userData.id,
      studentName: userData.userName,
    })

    // Update the course document with the new array
    courseDoc.set({
      courseStudents,
    })

    // Save the updated document
    await courseDoc.save()

    res.json('Registro en el curso completado')
  } catch (err) {
    console.error('Error:', err)
    res.status(500).send('Error en el registro en el curso.')
  }
})

router.patch('/course/calificate/:idCourse/:idStudent/:idFileProgress', async (req, res) => {
  try {
    const { idCourse, idStudent, idFileProgress } = req.params
    const { progressScore, progressComment } = req.body

    const courseDoc = await Course.findById(idCourse)

    const studentIndex = courseDoc.courseStudents.findIndex(
      (student) => student.studentId.toString() === idStudent
    )

    if (studentIndex === -1) {
      return res.status(404).json('Student not found in the course')
    }

    const progressIndex = courseDoc.courseStudents[studentIndex].studentProgress.findIndex(
      (progress) => progress.progressFileId.toString() === idFileProgress
    )

    if (progressIndex !== -1) {
      // Update progressScore and progressComment
      courseDoc.courseStudents[studentIndex].studentProgress[progressIndex].progressScore =
        progressScore
      courseDoc.courseStudents[studentIndex].studentProgress[progressIndex].progressComment =
        progressComment
    } else {
      return res.status(404).json('Progress not found for the given idFileProgress')
    }

    await courseDoc.save() // Guarda los nuevos datos

    res.json('Registro en el curso completado') // Envía una respuesta
  } catch (error) {
    console.error('Error:', err)
    res.status(500).send('Error en la calificación del estudiante.')
  }
})

router.get('/applications/:id', async (req, res) => {
  try {
    const { token } = req.cookies

    const userData = await verifyToken(token) // Verifica el token JWT

    // Find applications where applicationStudentInfo.studentId is equal to userDoc.id
    const applications = await Application.find({
      'applicationStudentInfo.studentId': userData.id,
    })

    res.json(applications)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/course/progress/:id', async (req, res) => {
  try {
    const { id } = req.params

    const courses = await Course.find({
      'courseStudents.studentId': id,
    })

    const studentData = courses.map((course) => {
      const student = course.courseStudents.find((student) => String(student.studentId) === id)
      return {
        courseId: course._id,
        courseName: course.courseName,
        tutorName: course.courseTutorName,
        progress: student.studentProgress,
      }
    })

    res.json(studentData)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
