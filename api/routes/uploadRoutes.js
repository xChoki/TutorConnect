/*    IMPORTS AND DECLARATIONS
 *    These are the imports and declaration in this file */

/* EXPRESSJS
 * This is what we are using to code the API */
const express = require("express")
const router = express.Router()
router.use(express.json()) // This is used to parse every JSON for express usage
router.use(express.urlencoded({ extended: true }))

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
function fileNameChange(path, name, id) {
  const uploadedFiles = []

  const newName = id + "_" + Date.now() + "_" + name
  console.log("Nuevo nombre de archivo: " + newName)

  // Construct the new path using the newName
  const newPath = "uploads/videos/" + newName
  console.log("Nuevo path de archivo: " + newPath)

  fs.renameSync(path, newPath)
  uploadedFiles.push(newName)

  return uploadedFiles
}

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*     /upload
 *     This endpoint handles the count of users and courses with the id, when it succeeded, validates the information and uses get to send the information */
router.get("/", (req, res) => {
  res.json("test ok")
})

const uploadVideo = multer({ dest: "uploads/videos/" })
router.post("/video/:id", uploadVideo.single("file"), (req, res) => {
  const { id } = req.params

  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.")
    }

    const { path, originalname } = req.file
    const filesReturn = fileNameChange(path, originalname, id)

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
    const filesReturn = fileNameChange(path, originalname, id)

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
    const filesReturn = fileNameChange(path, originalname, id)

    // console.log("Archivo subido")
    res.json({ message: "File uploaded successfully.", filesReturn })
  } catch (err) {
    // Handle errors gracefully
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
