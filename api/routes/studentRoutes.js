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

//verify
const {verifyToken} = require('./../middleware/authHandler')

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*     /student/cursos
 *     This endpoint handles cursos, when it succeeded, validates the information and uses get to receive the courses data*/
router.get("/courses", async (req, res) => {
  const { token } = req.cookies;

  try {
    const userData = await verifyToken(token);
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("Error:", err);
    res.status(401).json({ message: 'Access denied' });
  }
});

router.put("/course/register/:id", async (req, res) => {
  try {
    const { token } = req.cookies;
    const { id } = req.params;

    const userData = await verifyToken(token); // Verifica el token JWT

    const courseDoc = await Course.findById(id); // Encuentra el curso por ID en el modelo Course

    const courseStudents = [
      {
        studentId: userData.id,
        studentName: userData.userName,
      },
    ];

    courseDoc.set({
      courseStudents,
    });

    await courseDoc.save(); // Guarda los nuevos datos

    res.json("Registro en el curso completado"); // Envía una respuesta
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error en el registro en el curso.");
  }
});

module.exports = router
