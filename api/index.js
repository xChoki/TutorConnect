/*    IMPORTS AND DECLARATIONS
 *    These are the imports and declaration in this file */

/* Dotenv
 * Dependency used to read .env files, in NODE v20.6.0 it is integrated, but we are using v18.17.1LTS and it is not */
require("dotenv").config()

/* EXPRESSJS
 * This is what we are using to code the API */
const express = require("express") // import
const app = express() // This is to create an instance of the express app
const port = process.env.PORT || 4000 // Specify desired port
app.use(express.json()) // This is used to parse every JSON for express usage
app.use(express.urlencoded({ extended: true }))

/* CORS: Cross-Origin Resource Sharing
 * Used to give security and control access to our app*/
const cors = require("cors") // import
app.use(
  cors({
    credentials: true,
    origin: process.env.URL_CORS, // This is the origin that we are allowing access
  })
)

// app.use(express.static(path.join(__dirname, "uploads")))
app.use(express.static(__dirname + "/uploads"))
console.log("Static files are served from:", __dirname + "/routes/uploads");

/* Multer
 * Handles and helps with file uploading  */
const multer = require("multer")

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

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

// Import route files
const testRoutes = require("./routes/testRoutes")
const registerRoutes = require("./routes/registerRoutes")
const loginRoutes = require("./routes/loginRoutes")
const profileRoutes = require("./routes/profileRoutes")
const logoutRoutes = require("./routes/logoutRoutes")
const coursesRoutes = require("./routes/coursesRoutes")
const cuentaRoutes = require("./routes/cuentaRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const applicationRoutes = require("./routes/applicationRoutes")
const studentRoutes = require("./routes/studentRoutes")
const userRoutes = require("./routes/userRoutes")

/*     /test
 *     This endpoint is to test the connection, if it is up it shows "test ok" */
app.use("/api/test", testRoutes)

/*     /register
 *     This endpoint handles register form, validates the information and uses post */
app.use("/api/register", registerRoutes)

/*     /login
 *     This endpoint handles login form, validates the information and uses post*/
app.use("/api/login", loginRoutes)

/*     /profile
 *     This endpoint handles profile redirection from the login when it succeeded, validates the information and uses get*/
app.use("/api/profile", profileRoutes)

/*     /logout
 *     This endpoint handles logout from the sidebar, when it succeeded, validates the information and uses post*/
app.use("/api/logout", logoutRoutes)

/*     /cursos
 *     This endpoint handles cursos from the form, and others
 *     There are multiple endpoints inside:
 *      - POST: When it is called and it succeeded, validates the information and uses post to register a new Course
 *      - GET: When it is called and it succeeded, validates the information and uses get to obtain the Courses data
 *      - GET(id): When it is called and it succeeded, validates the information and uses get to obtain the detailed information by id
 *      - PUT: When it is called and it succeeded, validates the information and uses put to update the information
 *      - DELETE(id): When it is called and it succeeded, validates the information and uses delete to erase from database the information */
app.use("/api/courses", coursesRoutes)

/*    /cuenta
 *     This endpoint handles the count of users and courses with the id, when it succeeded, validates the information and uses get to send the information */
app.use("/api/cuenta", cuentaRoutes)

/*    /upload
 *     This endpoint handles the upload of files to the course
 *     /videos: manages the video files
 *     /homework: manages the homework files
 *     /material: manages the extra material files*/
app.use("/api/upload", uploadRoutes)

/*     /applications
 *     This endpoint handles applications from the form, and others
 *     There are multiple endpoints inside:
 *      - POST: When it is called and it succeeded, validates the information and uses post to register a new Application
 *      - GET: When it is called and it succeeded, validates the information and uses get to obtain the Applications data
 *
 *      TODO:
 *      - GET(id): When it is called and it succeeded, validates the information and uses get to obtain the detailed information by id
 *      - PUT: When it is called and it succeeded, validates the information and uses put to update the information
 *      - DELETE(id): When it is called and it succeeded, validates the information and uses delete to erase from database the information */
app.use("/api/applications", applicationRoutes)

app.use("/api/student", studentRoutes)

app.use("/api/user", userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
