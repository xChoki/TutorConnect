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

/* Mongoose
 * It is used to connect to a MongoDB database
 * the password is WdiVlejzjG8dwuBt */
const { default: mongoose } = require('mongoose') // import
mongoose.connect(process.env.MONGO_URL) // .env file that has access token to MongoDB Atlas
// Mongoose models
const User = require('../models/User') // Model for Users
const Course = require('../models/Course') // Model for Courses

/*   Node schedule
 *   This is needed to execute a certain job at an specific time */
const schedule = require('node-schedule') // import

/*  Function to count the users and courses
 *  courseCount: Amount of courses registered
 *  tutorCount: Amount of Tutors registered
 *  studentCount: Amount of students registered
 */
async function countUsersAndCourses() {
  try {
    const courseCount = await Course.countDocuments({})
    const tutorCount = await User.countDocuments({ 'userRoles.Tutor': 2002 })
    const studentCount = await User.countDocuments({
      'userRoles.User': 2001,
      $and: [
        { 'userRoles.Admin': { $ne: 5001 } },
        { 'userRoles.Tutor': { $ne: 2002 } },
        { 'userRoles.Teacher': { $ne: 2003 } },
      ],
    })
    return { tutorCount, studentCount, totalCursos: courseCount }
  } catch (err) {
    throw err
  }
}

/*  Function to give format to the date in chilean timezone
 */
function formatChileanDateTime() {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

  const now = new Date()
  const dayOfWeek = daysOfWeek[now.getUTCDay()]
  const day = now.getUTCDate()
  const month = now.getUTCMonth()
  const year = now.getUTCFullYear()
  const hours = now.getUTCHours().toString().padStart(2, '0')
  const minutes = now.getUTCMinutes().toString().padStart(2, '0')

  return `${dayOfWeek}, ${day}/${month}/${year} ${hours}:${minutes}`
}

/*   Scheduled function
 *   Used to count the number of registered users and courses
 *   This job is executed every 12 hours */
let counts = { tutorCount: 0, studentCount: 0, totalCursos: 0 }
const job = schedule.scheduleJob('0 */6 * * *', async function () {
  console.log('Contando usuarios y cursos...')

  try {
    counts = await countUsersAndCourses()
    const formattedDate = formatChileanDateTime()
    console.log(
      '[' +
        formattedDate +
        ' (UTC)] ' +
        'Tutores ' +
        '[' +
        counts.tutorCount +
        ']' +
        ', alumnos ' +
        '[' +
        counts.studentCount +
        '] ' +
        'y cursos ' +
        '[' +
        counts.totalCursos +
        ']'
    )
  } catch (err) {
    console.error(err)
  }
})

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*     /cuenta-datos
 *     This endpoint handles the count of users and courses with the id, when it succeeded, validates the information and uses get to send the information */
router.get('/', (req, res) => {
  res.json(counts)
})

router.get('/tutor/gradesmean/:id', async (req, res) => {
  try {
    const { id } = req.params

    const courseId = new mongoose.Types.ObjectId(id)

    Course.findOne({ _id: courseId })
      .then((course) => {
        if (!course) {
          res.status(204).send('No posees cursos registrados')
        } else {
          // id is valid
          // continue with your programming logic

          Course.aggregate([
            { $unwind: '$courseStudents' },
            { $unwind: '$courseStudents.studentProgress' },
            {
              $group: {
                _id: '$courseStudents.studentProgress.progressFileId',
                fileName: { $first: '$courseStudents.studentProgress.progressFile.fileName' },
                averageScore: { $avg: '$courseStudents.studentProgress.progressScore' },
              },
            },
          ])
            .then((result) => {
              // console.log(result)
              res.json(result)
            })
            .catch((error) => {
              res.status(500).send('Internal Server Error')
              console.error(error)
            })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/tutor/gradesmeanpercourse/:id', async (req, res) => {
  try {
    const { id } = req.params
    const tutorId = new mongoose.Types.ObjectId(id)

    Course.aggregate([
      { $match: { courseTutorId: tutorId } },
      { $unwind: '$courseStudents' },
      { $unwind: '$courseStudents.studentProgress' },
      {
        $group: {
          _id: '$courseName',
          averageScore: { $avg: '$courseStudents.studentProgress.progressScore' },
        },
      },
      {
        $project: {
          _id: 0,
          courseName: '$_id',
          averageScore: 1,
        },
      },
    ])
      .then((result) => {
        // console.log(result)
        res.json(result)
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/tutor/studentcountpercourse/:id', async (req, res) => {
  try {
    const { id } = req.params
    const tutorId = new mongoose.Types.ObjectId(id)

    Course.aggregate([
      { $match: { courseTutorId: tutorId } },
      { $unwind: '$courseStudents' },
      {
        $group: {
          _id: '$courseName',
          studentCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          courseName: '$_id',
          studentCount: 1,
        },
      },
    ])
      .then((result) => {
        // console.log(result)
        res.json(result)
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})
module.exports = router
