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
const User = require("../models/User") // Model for Applications

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
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/default/") // Default destination for uploads
  },
  filename: (req, file, cb) => {
    const applicationId = req.body.id || req.query.id
    if (applicationId)
      cb(null, "prueba " + applicationId + "_" + Date.now() + "_" + file.originalname)
  },
})

const upload = multer({
  storage: storage, // Use the default storage configuration
})

/* Function to change the file name */
function fileNameChange(filePath, fileName, studentId) {
  const uploadedFiles = []

  const fileExtension = ".pdf" // Get the file extension
  const newName = studentId + "____" + Date.now() + "____" + fileName

  // Construct the new filePath using the newName and the original file extension
  const newFileName = newName + fileExtension // Include the file extension in the new file name
  let newPath = "uploads/applications/" + newFileName

  console.log("New File Name: " + newFileName) // Log the new file name
  console.log("New Path: " + newPath) // Log the new path

  fs.renameSync(filePath, newPath)
  uploadedFiles.push(newFileName)

  return { uploadedFiles, newFileName } // Return the new file name
}

function createApplication(
  user_token,
  applicationDescription,
  applicationExtraInfo,
  applicationGradesFile,
  applicationRegularFile,
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

      const applicationStudentInfo = {
        studentId: userData.id,
        studentName: userData.userName,
        studentEmail: userData.userEmail,
        studentDateofBirth: userData.userDate,
      }

      Application.create({
        applicationStudentInfo,
        applicationDescription,
        applicationExtraInfo,
        applicationGradesFile,
        applicationRegularFile,
        applicationState,
      })
    }
  )
  return
}

async function addRoleToUser(applicationStudentId) {
  try {
    const userDoc = await User.findById(applicationStudentId)

    if (!userDoc) {
      console.log("User not found")
      return
    }

    userDoc.userRoles = {
      ...userDoc.userRoles,
      Tutor: 2002,
    }

    await userDoc.save()

    // const updatedUser = await userDoc.save()
    // console.log(updatedUser)
  } catch (error) {
    console.error(error)
  }
}

async function removeRoleFromUser(applicationStudentId, roleToRemove) {
  try {
    const update = {
      $unset: {
        [`userRoles.${roleToRemove}`]: 1,
      },
    }

    const userDoc = await User.findByIdAndUpdate(applicationStudentId, update, { new: true })

    if (!userDoc) {
      console.log("User not found")
      return
    }

    // console.log(userDoc)
  } catch (error) {
    console.error(error)
  }
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
router.post(
  "/",
  uploadApplicationFile.fields([
    { name: "applicationGradesFile", maxCount: 1 },
    { name: "applicationRegularFile", maxCount: 1 },
  ]),
  (req, res) => {
    // We listen to /applications with a post function
    if (!req.files || !req.files.applicationGradesFile || !req.files.applicationRegularFile) {
      return res.status(400).send("No files uploaded.")
    }
    const { applicationGradesFile, applicationRegularFile } = req.files
    const { token } = req.cookies // We require from the session the token cookie
    const { applicationDescription, applicationExtraInfo } = req.body // We require from the form the applicationDescription, applicationExtraInfo sent by the user

    let studentId = ""

    jwt.verify(
      // We verify the jwt
      token, // token: string,
      jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
      {}, // options?: VerifyOptions & { complete?: false },
      async (err, userData) => {
        // callback?: VerifyCallback<JwtPayload | string>,
        if (err) throw err // If there's an error we send it
        studentId = userData.id
      }
    )

    let applicationGrades = {
      fileName: "", // Initialize with an empty string
      fileUrl: "uploads/applications",
    }

    let applicationRegular = {
      fileName: "", // Initialize with an empty string
      fileUrl: "uploads/applications",
    }

    if (applicationGradesFile) {
      const gradesFile = applicationGradesFile[0]
      const gradesFileData = fileNameChange(gradesFile.path, "Notas", studentId)

      applicationGrades.fileName = gradesFileData.newFileName // Update the fileName property
      applicationGrades.fileUrl = "uploads/applications" // Update the fileUrl property

      console.log("Notas")
      console.log(applicationGrades.fileName)
      console.log(applicationGrades.fileUrl)
    }

    if (applicationRegularFile) {
      const regularFile = applicationRegularFile[0]
      const regularFileData = fileNameChange(regularFile.path, "AlumnoRegular", studentId)

      applicationRegular.fileName = regularFileData.newFileName // Update the fileName property
      applicationRegular.fileUrl = "uploads/applications" // Update the fileUrl property
      console.log("regular")
      console.log(applicationRegular.fileName)
      console.log(applicationRegular.fileUrl)
    }

    createApplication(
      token,
      applicationDescription,
      applicationExtraInfo,
      applicationGrades,
      applicationRegular,
      "En proceso"
    )
  }
)

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

      res.json(await Application.find()) // We find all the applications
    }
  )
})

/*     /applictaions
 *     This endpoint handles applications, when it succeeded, validates the information and uses put to update the application state (Aceptad, Rechazada) */
router.put("/", async (req, res) => {
  // We listen to /cursos with an async put function
  const { token } = req.cookies // We require from the session the token cookie
  let { applicationId, applicationState, applicationStudentId, applicationComment } = req.body // We require from the form the application id, applicationState and applicationStudentId sent by the user
  const allowedRoles = [5001, 2003] // we set the allowed roles variable, 5001: Admin, 2003: Teacher
  jwt.verify(
    // We verify the jwt
    token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it
      const applicationDoc = await Application.findById(applicationId) // We find by id the application in the Application model

      if (Object.values(userData.userRoles).some((role) => allowedRoles.includes(role))) {
        // We checking if the logged in user has the allowedRoles
        // If it is true (the user has the allowed roles) we set the new values

        const applicationReviewer = {
          reviewerId: userData.id,
          reviewerName: userData.userName,
          reviewerDate: Date.now(),
          reviewerComment: applicationComment,
        }

        applicationDoc.set({
          applicationReviewer,
          applicationState,
        })

        applicationStudentId = new mongoose.Types.ObjectId(applicationStudentId)
        applicationState === "Aceptada"
          ? addRoleToUser(applicationStudentId)
          : removeRoleFromUser(applicationStudentId, "Tutor")

        await applicationDoc.save() // We save the new data
        // await studentDocDoc.save() // We save the new data

        res.json("Actualización completada") // We send a response
      } else {
        // If it is false (doesn't have the allowedRoles) we send a message
        console.log("NO TIENE LOS ROLES PERMITIDOS")
        res.json("Actualización ha fallado, no posees los permisos necesarios")
      }
    }
  )
})

/*     /applications:id
 *     This endpoint handles cursos with the id info, when it succeeded, validates the information and uses get to obtain the detailed information */
router.get("/:id", async (req, res) => {
  // We listen to /cursos with an async get function
  const { id } = req.params // We require the id parameter
  res.json(await Application.findById(id)) // We find the data from the Course model with the specific id
})

module.exports = router
