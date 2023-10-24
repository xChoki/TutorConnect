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

/* JSONWebToken
 * Self-contained way for securely transmitting information between parties as a JSON object*/
const jwt = require("jsonwebtoken") // import
const jwtSecret = process.env.JWT_SECRET // jwt secret token, it is randomly typed

/* Mongoose
 * It is used to connect to a MongoDB database
 * the password is WdiVlejzjG8dwuBt */
const { default: mongoose } = require("mongoose") // import
mongoose.connect(process.env.MONGO_URL) // .env file that has access token to MongoDB Atlas
// Mongoose models
const Application = require("../models/Application") // Model for Applications
const Course = require("../models/Course") // Model for Courses

/* Cookieparser
 * Parse and handle HTTP cookies that are sent between the client and the server.  */
const cookieParser = require("cookie-parser") // import
router.use(cookieParser()) // This is to create an instance of the cookieparser

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*     /student/cursos
 *     This endpoint handles cursos, when it succeeded, validates the information and uses get to receive the courses data*/
router.get("/courses", (req, res) => {
  // We listen to /applications with a get function
  const { token } = req.cookies // We require from the session the token cookie

  jwt.verify(
    // We verify the jwt
    token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it
      const { id } = userData // We retreive from userData the id of the logged in user

      res.json(await Course.find()) // We find all the applications
    }
  )
})

router.get("/:id", async (req, res) => {
  const { id } = req.params // Get the studentId from the URL parameter

  res.json(await Application.findOne({ "applicationStudentInfo.studentId": id }))
})

router.put("/course/register/:id", (req, res) => {
  const { token } = req.cookies
  const { id } = req.params

  jwt.verify(
    // We verify the jwt
    token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it
      const courseDoc = await Course.findById(id) // We find by id the course in the Course model

      courseStudents = [
        {
          student_id: userData.id,
          student_name: userData.userName,
        },
      ]

      courseDoc.set({
        courseStudents,
      })

      await courseDoc.save() // We save the new data
    }
  )
})

module.exports = router
