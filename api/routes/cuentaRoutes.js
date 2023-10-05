/*    IMPORTS AND DECLARATIONS
 *    These are the imports and declaration in this file */

/* EXPRESSJS
 * This is what we are using to code the API */
const express = require("express")
const router = express.Router()
router.use(express.json()) // This is used to parse every JSON for express usage
router.use(express.urlencoded({ extended: true }))

/* Dotenv
 * Dependency used to read .env files, in NODE v20.6.0 it is integrated, but we are using v18.17.1LTS and it is not */
require("dotenv").config()

/* Mongoose
 * It is used to connect to a MongoDB database
 * the password is WdiVlejzjG8dwuBt */
const { default: mongoose } = require("mongoose") // import
mongoose.connect(process.env.MONGO_URL) // .env file that has access token to MongoDB Atlas
// Mongoose models
const User = require("../models/User") // Model for Users
const Course = require("../models/Course") // Model for Courses

/*   Node schedule
 *   This is needed to execute a certain job at an specific time */
const schedule = require("node-schedule") // import

/*   Scheduled function 
 *   Used to count the number of registered users and courses
 *   This job is executed every 12 hours */
const job = schedule.scheduleJob("* 12 * * *", async function () {
  // We send to the server console that the job is executing
  console.log("Contando usuarios y cursos...")

  try {
    //const tutorCount = await User.countDocuments({ role: "tutor" });
    const userCount = await User.countDocuments({}) // We count the registered users in the User model
    const cursosCount = await Course.countDocuments({}) // We count the registered courses in the Course model
    // We send to the server console the numbers
    console.log("Usuarios totales:", userCount)
    console.log("Cursos totales:", cursosCount)
  } catch (err) {
    // if there's an error we send it
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
router.get("/", async (req, res) => {
  // We listen to /cuenta-datos with an async get function
  try {
    //const tutorCount = await User.countDocuments({ role: "tutor" });
    const userCount = await User.countDocuments({}) // We count the registered users in the User model
    const cursoCount = await Course.countDocuments({}) // We count the registered courses in the Course model

    res.json({ totalUsers: userCount, totalCursos: cursoCount }) // We send a response with the data
  } catch (err) {
    // if there's an error we send it
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
