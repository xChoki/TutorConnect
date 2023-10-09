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

/* Multer
 * Handles and helps with file uploading  */
const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/default/") // Default destination for uploads
  },
  filename: (req, file, cb) => {
    const courseId = req.body.id || req.query.id
    if (courseId)
      cb(
        null,
        "prueba " + courseId + "_" + Date.now() + "_" + file.originalname
      )
  },
})

const upload = multer({
  storage: storage, // Use the default storage configuration
})

/* Function to change the file name */
function fileNameChange(path, name, id, fileType) {
  const uploadedFiles = []

  const newName = id + "_" + Date.now() + "_" + name
  // console.log("Nuevo nombre de archivo: " + newName)

  // Construct the new path using the newName
  let newPath = ""
  switch (fileType) {
    case "video":
      newPath = "uploads/videos/" + newName
      break
    case "homework":
      newPath = "uploads/homework/" + newName
      break
    case "material":
      newPath = "uploads/material/" + newName
      break
  }

  // console.log("Nuevo path de archivo: " + newPath)

  fs.renameSync(path, newPath)
  uploadedFiles.push(newName)

  return { uploadedFiles, newName }
}

function updateMongoFileField(
  file_name,
  file_url,
  user_token,
  course_id,
  type
) {
  jwt.verify(
    // We verify the jwt
    user_token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it

      const courseDoc = await Course.findById(course_id) // We find by id the course in the Course model

      if (userData.id === courseDoc.courseTutorId.toString()) {
        // We are comparing the logged in user with the tutor id registered in the course
        // If it is true (the id is the same) we set the new values
        switch (type) {
          case "video":
            courseDoc.videoFiles.push({
              fileName: file_name,
              fileUrl: file_url,
            })
            break
          case "homework":
            courseDoc.homeworkFiles.push({
              fileName: file_name,
              fileUrl: file_url,
            })
            break
          case "material":
            courseDoc.materialFiles.push({
              fileName: file_name,
              fileUrl: file_url,
            })
            break
        }
        await courseDoc.save() // We save the new data

        // console.log("Actualizado curso con path de archivo")
        // res.json("Actualización completada") // We send a response
      } else {
        // If it is false (the id is not the same) we send a message
        res.json("Actualización ha fallado, no posees los permisos necesarios")
      }
    }
  )

  return
}

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*     /upload
 *     This endpoint handles the count of users and courses with the id, when it succeeded, validates the information and uses get to send the information */
const uploadVideo = multer({ dest: "uploads/videos/" })
router.post("/video/:id", uploadVideo.single("file"), (req, res) => {
  const { id } = req.params

  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.")
    }

    const { path, originalname } = req.file
    const filesReturn = fileNameChange(path, originalname, id, "video")

    // console.log("Nombre return funcion: " + filesReturn.newName)

    const { token } = req.cookies // We require from the session the token cookie
    updateMongoFileField(
      filesReturn.newName,
      "uploads/videos",
      token,
      id,
      "video"
    )

    // console.log("Archivo subido")
    res.json({ message: "File uploaded successfully.", filesReturn })
  } catch (err) {
    // Handle errors gracefully
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

const uploadHomework = multer({ dest: "uploads/homework/" })
router.post("/homework/:id", uploadHomework.single("file"), (req, res) => {
  const { id } = req.params

  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.")
    }

    const { path, originalname } = req.file
    const filesReturn = fileNameChange(path, originalname, id, "homework")

    const { token } = req.cookies // We require from the session the token cookie
    updateMongoFileField(
      filesReturn.newName,
      "uploads/homework",
      token,
      id,
      "homework"
    )

    // console.log("Archivo subido")
    res.json({ message: "File uploaded successfully.", filesReturn })
  } catch (err) {
    // Handle errors gracefully
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

const uploadMaterial = multer({ dest: "uploads/material/" })
router.post("/material/:id", uploadMaterial.single("file"), (req, res) => {
  const { id } = req.params

  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.")
    }

    const { path, originalname } = req.file
    const filesReturn = fileNameChange(path, originalname, id, "material")

    const { token } = req.cookies // We require from the session the token cookie
    updateMongoFileField(
      filesReturn.newName,
      "uploads/material",
      token,
      id,
      "material"
    )

    // console.log("Archivo subido")
    res.json({ message: "File uploaded successfully.", filesReturn })
  } catch (err) {
    // Handle errors gracefully
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
