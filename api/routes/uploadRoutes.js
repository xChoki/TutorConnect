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
const User = require("../models/User") // Model for Courses

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
    const courseId = req.body.id || req.query.id
    if (courseId) cb(null, "prueba " + courseId + "_" + Date.now() + "_" + file.originalname)
  },
})

const upload = multer({
  storage: storage, // Use the default storage configuration
})

/* Function to change the file name */
function fileNameChange(path, name, id, fileType) {
  const uploadedFiles = []

  const newName = id + "____" + Date.now() + "____" + name
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

function studentFileNameChange(path, name, idCourse, idStudent) {
  const uploadedFiles = []

  const newName = idCourse + "____" + idStudent + "____" + Date.now() + "____" + name
  // console.log("Nuevo nombre de archivo: " + newName)

  // Construct the new path using the newName
  const newPath = "uploads/homework/response/" + newName

  // console.log("Nuevo path de archivo: " + newPath)

  fs.renameSync(path, newPath)
  uploadedFiles.push(newName)

  return { uploadedFiles, newName }
}

function updateMongoFileFieldTutor(file_name, file_url, user_token, course_id, type) {
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

async function updateMongoFileFieldStudent(file_name, file_url, course_id, student_id, file_id) {
  try {
    // Convert student_id to ObjectId
    const studentObjectId = new mongoose.Types.ObjectId(student_id)

    // Find the course by id
    const courseDoc = await Course.findById(course_id)

    if (!courseDoc) {
      console.error("Course not found")
      return
    }

    // Find the student in the courseStudents array by studentId
    const student = courseDoc.courseStudents.find((student) =>
      student.studentId.equals(studentObjectId)
    )

    if (student) {
      // Update the student's progress
      const fileData = {
        fileName: file_name,
        fileUrl: file_url,
      }

      const studentProgress = {
        progressFileId: file_id,
        progressFile: fileData,
      }

      // Update the existing student's progress in the course
      student.studentProgress.push(studentProgress)

      // Save the updated course document
      await courseDoc.save()

      console.log("Student progress updated successfully")
    } else {
      console.log("Student not found in the course")
    }
  } catch (error) {
    console.error("Error updating student progress:", error)
  }
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
    updateMongoFileFieldTutor(filesReturn.newName, "uploads/videos", token, id, "video")

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
    updateMongoFileFieldTutor(filesReturn.newName, "uploads/homework", token, id, "homework")

    // console.log("Archivo subido")
    res.json({ message: "File uploaded successfully.", filesReturn })
  } catch (err) {
    // Handle errors gracefully
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

const uploadHomeworkResponse = multer({ dest: "uploads/homework/response" })
router.post(
  "/homework/response/:idCourse/:idStudent/:idFile",
  uploadHomeworkResponse.single("file"),
  (req, res) => {
    console.log("llamado endpoint")
    const { idCourse, idStudent, idFile } = req.params

    console.log("Datos:")
    console.log("id curso: ", idCourse)
    console.log("id estudiante: ", idStudent)
    console.log("id archivo al que responde: ", idFile)

    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.")
      }

      const { path, originalname } = req.file
      const filesReturn = studentFileNameChange(path, originalname, idCourse, idStudent)

      //file_name, file_url, course_id, student_id, file_id
      updateMongoFileFieldStudent(
        filesReturn.newName,
        "uploads/homework/response",
        idCourse,
        idStudent,
        idFile
      )

      // console.log("Archivo subido")
      res.json({ message: "File uploaded successfully.", filesReturn })
    } catch (err) {
      // Handle errors gracefully
      console.error(err)
      res.status(500).json({ error: "Internal server error" })
    }
  }
)

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
    updateMongoFileFieldTutor(filesReturn.newName, "uploads/material", token, id, "material")

    // console.log("Archivo subido")
    res.json({ message: "File uploaded successfully.", filesReturn })
  } catch (err) {
    // Handle errors gracefully
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Add a new route for file deletion
router.delete("/file/:type/:id/:fileName", async (req, res) => {
  const { id, type, fileName } = req.params

  try {
    // Construct the path to the file based on the file type
    let filePath = `uploads/${type}/${fileName}`

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" })
    }

    // Delete the file from your storage system
    await fs.promises.unlink(filePath)

    // console.log("File deleted locally")
    // console.log("Deleting file from mongodb")
    // Find the course document by ID
    const course = await Course.findById(id)

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Determine which array field to remove the file from (e.g., videoFiles, materialFiles, homeworkFiles)
    let fileArray
    switch (type) {
      case "videos":
        fileArray = course.videoFiles
        break
      case "material":
        fileArray = course.materialFiles
        break
      case "homework":
        fileArray = course.homeworkFiles
        break
      default:
        return res.status(400).json({ message: "Invalid file type" })
    }

    // Find the index of the file to remove from the array
    const fileIndex = fileArray.findIndex((file) => file.fileName === fileName)

    if (fileIndex === -1) {
      return res.status(404).json({ message: "File not found in the course" })
    }

    // Remove the file from the array
    fileArray.splice(fileIndex, 1)

    // Save the updated course document
    await course.save()

    // console.log("check mongodb")
    return res.json({ message: "File deleted successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Internal Server Error" })
  }
})

module.exports = router
