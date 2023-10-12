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
const Application = require("../models/Application") // Model for Applications

/* JSONWebToken
 * Self-contained way for securely transmitting information between parties as a JSON object*/
const jwt = require("jsonwebtoken") // import
const jwtSecret = process.env.JWT_SECRET // jwt secret token, it is randomly typed

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
    const applicationId = req.body.id || req.query.id
    if (applicationId)
      cb(
        null,
        "prueba " + applicationId + "_" + Date.now() + "_" + file.originalname
      )
  },
})

const upload = multer({
  storage: storage, // Use the default storage configuration
})

/* Function to change the file name */
function fileNameChange(filePath, fileName, studentId) {
  const uploadedFiles = []

  const newName = studentId + "____" + Date.now() + "____" + fileName
  // console.log("Nuevo nombre de archivo: " + newName)

  // Construct the new filePath using the newName
  let newPath = "uploads/applications/" + newName

  // console.log("Nuevo filePath de archivo: " + newPath)

  fs.renameSync(filePath, newPath)
  uploadedFiles.push(newName)

  return { uploadedFiles, newName }
}

function createApplication(
  user_token,
  applicationDescription,
  applicationExtraInfo,
  applicationFiles,
  applicationState
) {
  jwt.verify(
    // We verify the jwt
    user_token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it

      const applicationStudentInfo = [
        {
          studentId: userData.id,
          studentName: userData.userName,
        },
      ]

      Application.create({
        applicationStudentInfo,
        applicationDescription,
        applicationExtraInfo,
        applicationFiles,
        applicationState
      })
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

/*     /applications
 *     This endpoint handles applications from the form, when it succeeded, validates the information and uses post*/
const uploadApplicationFile = multer({ dest: "uploads/applications/" })
router.post("/", uploadApplicationFile.single("file"), (req, res) => {
  // We listen to /applications with a post function
  if (!req.file) {
    return res.status(400).send("No file uploaded.")
  }
  const { path, originalname } = req.file
  const { token } = req.cookies // We require from the session the token cookie
  const { applicationDescription, applicationExtraInfo } = req.body // We require from the form the applicationDescription, applicationExtraInfo sent by the user

  let filesReturn = ""
  jwt.verify(
    // We verify the jwt
    token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it
      filesReturn = fileNameChange(path, originalname, userData.id)
    }
  )

  // console.log("Datos de archivo subido original:")
  // console.log("Path: ", path)
  // console.log("Nombre: ", originalname)
  // console.log("Devuelta de funcion cambio nombre: ", filesReturn)

  const applicationFiles = {
    fileName: filesReturn.newName,
    fileUrl: "uploads/applications",
  }

  createApplication(
    token,
    applicationDescription,
    applicationExtraInfo,
    applicationFiles,
    "En proceso"
  )
})

/*     /applications
 *     This endpoint handles applications, when it succeeded, validates the information and uses get to receive the courses data*/
router.get("/", (req, res) => {
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

      res.json(await Application.find()) // We find the courses created by the logged in tutor
    }
  )
})

router.get("/:id", async (req, res) => {
  // We listen to /cursos with an async get function
  const { id } = req.params // We require the id parameter
  res.json(await Application.findById(id)) // We find the data from the Course model with the specific id
})

module.exports = router
