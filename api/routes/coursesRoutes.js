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
const Course = require("../models/Course") // Model for Courses

/* JSONWebToken
 * Self-contained way for securely transmitting information between parties as a JSON object*/
const jwt = require("jsonwebtoken") // import
const jwtSecret = "AOi3ejk34io" // jwt secret token, it is randomly typed

/* Cookieparser
 * Parse and handle HTTP cookies that are sent between the client and the server.  */
const cookieParser = require("cookie-parser") // import
router.use(cookieParser()) // This is to create an instance of the cookieparser

/*     /cursos
 *     This endpoint handles cursos from the form, when it succeeded, validates the information and uses post*/
router.post("/", (req, res) => {
  // We listen to /cursos with a post function
  const { token } = req.cookies // We require from the session the token cookie
  const { courseName, courseDescription, courseCategory, courseExtrainfo, courseNeurodiv } =
    req.body // We require from the form the courseName, courseDescription, courseCategory, courseExtrainfo and courseNeurodiv sent by the user

  jwt.verify(
    // We verify the jwt
    token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      // We catch error and the user data
      if (err) throw err // If there's an error we send it
      await Course.create({
        courseTutorId: userData.id,
        courseTutorName: userData.name,
        courseName,
        courseDescription,
        courseCategory,
        courseExtrainfo,
        courseNeurodiv,
      }) // We create a course using the Course model by inserting the data sent by user and data from the user (id and name)
    }
  )
})

/*     /cursos
 *     This endpoint handles cursos, when it succeeded, validates the information and uses get to receive the courses data*/
router.get("/", (req, res) => {
  // We listen to /cursos with a get function
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

      res.json(
        await Course.find({
          $or: [
            { courseTutorId: id }, // Tutor is the logged-in user
            { "courseStudents.student_id": id }, // Student with matching ID
          ],
        })
      ) // We find the courses created by the logged in tutor
    }
  )
})

/*     /cursos:id
 *     This endpoint handles cursos with the id info, when it succeeded, validates the information and uses get to obtain the detailed information */
router.get("/:id", async (req, res) => {
  // We listen to /cursos with an async get function
  const { id } = req.params // We require the id parameter
  res.json(await Course.findById(id)) // We find the data from the Course model with the specific id
})

/*     /cursos
 *     This endpoint handles cursos with the id info, when it succeeded, validates the information and uses put to update the information */
router.put("/", async (req, res) => {
  // We listen to /cursos with an async put function
  const { token } = req.cookies // We require from the session the token cookie
  const { id, courseName, courseDescription, courseCategory, courseExtrainfo, courseNeurodiv } =
    req.body // We require from the form the id, courseName, courseDescription, courseCategory, courseExtrainfo and courseNeurodiv sent by the user
  jwt.verify(
    // We verify the jwt
    token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it

      const courseDoc = await Course.findById(id) // We find by id the course in the Course model
      if (userData.id === courseDoc.courseTutorId.toString()) {
        // We are comparing the logged in user with the tutor id registered in the course
        // If it is true (the id is the same) we set the new values
        courseDoc.set({
          courseName,
          courseDescription,
          courseCategory,
          courseExtrainfo,
          courseNeurodiv,
        })
        await courseDoc.save() // We save the new data

        res.json("Actualización completada") // We send a response
      } else {
        // If it is false (the id is not the same) we send a message
        res.json("Actualización ha fallado, no posees los permisos necesarios")
      }
    }
  )
})

/*     /cursos-eliminar:id
 *     This endpoint handles the deletion of courses with the id, when it succeeded, validates the information and uses delete to erase from database the information */
router.delete("/:id", async (req, res) => {
  // We listen to /cursos-eliminar specific by the course id with an async put function
  const { token } = req.cookies // We require from the session the token cookie
  const { id } = req.params // We require the courseid parameter

  jwt.verify(
    // We verify the jwt
    token, //  token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it

      try {
        // If the connection goes trough we enter and delete the course

        const courseDoc = await Course.findById(id) // We find the course by id sent by the user

        if (!courseDoc) {
          // If there's no course by that id we send an error
          return res.status(404).json({ error: "El curso no se encuentra" })
        }

        if (userData.id === courseDoc.courseTutorId.toString()) {
          // We are comparing the logged in user with the tutor id registered in the course
          // If it is true (the id is the same) we delete the course
          await Course.findByIdAndDelete(id) // We find by id and delete the course
          res.json({ message: "Curso eliminado exitosamente!" }) // Message
        } else {
          // If it is false (the id is not the same) we send an error message
          res.status(403).json({
            error: "No cuentas con los permisos para borrar este curso",
          })
        }
      } catch (error) {
        // If the connection doesn't go trough we send an error
        console.error(error)
        res.status(500).json({ error: "Error interno de servidor" })
      }
    }
  )
})

module.exports = router
