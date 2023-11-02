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

/* Cookieparser
 * Parse and handle HTTP cookies that are sent between the client and the server.  */
const cookieParser = require("cookie-parser") // import
router.use(cookieParser()) // This is to create an instance of the cookieparser

//verify
const { verifyToken } = require("./../middleware/authHandler")

/*     /cursos
 *     This endpoint handles cursos from the form, when it succeeded, validates the information and uses post*/
router.post("/", async (req, res) => {
  try {
    const { token } = req.cookies // We require from the session the token cookie
    // We require from the form the courseName, courseDescription, courseCategory, courseExtrainfo and courseNeurodiv sent by the user
    const { courseName, courseDescription, courseCategory, courseExtrainfo, courseNeurodiv } =
      req.body

    const userData = await verifyToken(token) // Verify Token

    await Course.create({
      courseTutorId: userData.id,
      courseTutorName: userData.name,
      courseName,
      courseDescription,
      courseCategory,
      courseExtrainfo,
      courseNeurodiv,
    })

    res.status(200).send("Curso creado con éxito.")
  } catch (err) {
    console.error("Error:", err)
    res.status(500).send("Error en la creación del curso.")
  }
})

/*     /cursos
 *     This endpoint handles cursos, when it succeeded, validates the information and uses get to receive the courses data*/
router.get("/", async (req, res) => {
  try {
    const { token } = req.cookies // We require from the session the token cookie

    const userData = await verifyToken(token) // Verify Token

    const { id } = userData

    const courses = await Course.find({
      $or: [
        { courseTutorId: id }, // Tutor is the logged-in user
        { "courseStudents.student_id": id }, // Student with matching ID
      ],
    })

    res.json(courses)
  } catch (err) {
    console.error("Error:", err)
    res.status(500).send("Error en la obtención de cursos.")
  }
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
  try {
    const { token } = req.cookies
    const { id, courseName, courseDescription, courseCategory, courseExtrainfo, courseNeurodiv } =
      req.body

    const userData = await verifyToken(token) // Verifica el token JWT

    const courseDoc = await Course.findById(id) // Encuentra el curso por ID en el modelo Course

    if (userData.id === courseDoc.courseTutorId.toString()) {
      courseDoc.set({
        courseName,
        courseDescription,
        courseCategory,
        courseExtrainfo,
        courseNeurodiv,
      })
      await courseDoc.save()

      res.json("Actualización completada")
    } else {
      res.json("Actualización ha fallado, no posees los permisos necesarios")
    }
  } catch (err) {
    console.error("Error:", err)
    res.status(500).send("Error en la actualización del curso.")
  }
})

/*     /cursos-eliminar:id
 *     This endpoint handles the deletion of courses with the id, when it succeeded, validates the information and uses delete to erase from database the information */
router.delete("/:id", async (req, res) => {
  try {
    const { token } = req.cookies
    const { id } = req.params

    const userData = await verifyToken(token) // Verifica el token JWT

    const courseDoc = await Course.findById(id)

    if (!courseDoc) {
      return res.status(404).json({ error: "El curso no se encuentra" })
    }

    if (userData.id === courseDoc.courseTutorId.toString()) {
      await Course.findByIdAndDelete(id)
      res.json({ message: "Curso eliminado exitosamente!" })
    } else {
      res.status(403).json({
        error: "No cuentas con los permisos para borrar este curso",
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error interno de servidor" })
  }
})

module.exports = router
