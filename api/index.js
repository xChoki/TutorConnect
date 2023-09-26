/* --------------------------------------------
 *    IMPORTS AND DECLARATIONS
 *    These are the imports and declaration of every dependency used in the backend */

/* Node schedule
 * This is needed to execute a certain job at a certain interval of time */
const schedule = require("node-schedule") // import

/* EXPRESSJS
 * This is what we are using to code the API */
const express = require("express") // import
const app = express() // This is to create an instance of the express app
const port = process.env.PORT || 4000 // Specify desired port
app.use(express.json()) // This is used to parse every JSON for express usage

/* CORS: Cross-Origin Resource Sharing
 * Used to give security and control access to our app*/
const cors = require("cors") // import
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // This is the origin that we are allowing access
  })
)

/* Dotenv
 * Dependency used to read .env files, in NODE v20.6.0 it is integrated, but we are using v18.17.1LTS and it is not */
require("dotenv").config()

/* Mongoose
 * It is used to connect to a MongoDB database
 * the password is WdiVlejzjG8dwuBt */
const { default: mongoose } = require("mongoose") // import
mongoose.connect(process.env.MONGO_URL) // .env file that has access token to MongoDB Atlas
// Mongoose models
const User = require("./models/User") // Model for Users
const Course = require("./models/Course") // Model for Courses

/* BCRYPTJS
 * It is used to give encrypted tokens to later use in cookies, etc. */
const bcrypt = require("bcryptjs") // import
const bcryptSalt = bcrypt.genSaltSync(10) // Generate salt with a length of 10

/* JSONWebToken
 * Self-contained way for securely transmitting information between parties as a JSON object*/
const jwt = require("jsonwebtoken") // import
const jwtSecret = "AOi3ejk34io" // jwt secret token, it is randomly typed

/* Cookieparser
 * Parse and handle HTTP cookies that are sent between the client and the server.  */
const cookieParser = require("cookie-parser") // import
app.use(cookieParser()) // This is to create an instance of the cookieparser

/* --------------------------------------------
 *     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/* *************************
 *     /test
 *     This endpoint is to test the connection, if it is up it shows "test ok" */
app.get("/api/test", (req, res) => {
  res.json("test ok")
})

/* *************************
 *     /register
 *     This endpoint handles register form, validates the information and uses post */
app.post("/api/register", async (req, res) => {
  // we listen to /register with an async post function
  const { userName, userEmail, userPassword } = req.body // We require from the form the name, email and password sent by the user
  console.log("Received registration request with:")
  console.log("Name:", userName)
  console.log("Email:", userEmail)
  
  // Validate that userEmail is not null or empty
  if (!userEmail || userEmail.trim() === "") {
    return res.status(422).json({ error: "Email is required." })
  }

  // Check for duplicate email before inserting
  const duplicate = await User.findOne({ userEmail: userEmail }).exec()
  if (duplicate) {
    return res.status(409).json({ error: "Email address is already in use." })
  }

  try {
    // We try the connection
    const userDoc = await User.create({
      userName,
      userEmail,
      userPassword: bcrypt.hashSync(userPassword, bcryptSalt),
    }) // This creates a User using the User mongoose model defined beforehand

    res
      .status(201)
      .json({ success: `El usuario ${userDoc.userName} ha sido creado!` }) // This gives as a response the parsed json
  } catch (e) {
    // in case of an error it send an error message
    res.status(422).json(e) // Error message corresponds to status 422, it means "The request was well-formed but was unable to be followed due to semantic errors."
    console.log(`Error crear usuario ${userEmail}, con error ${e}`)
  }
})

/* *************************
 *     /login
 *     This endpoint handles login form, validates the information and uses post*/
app.post("/api/login", async (req, res) => {
  // We listen to /login with an async post funcion
  const { userEmail, userPassword } = req.body // We require from the form the name, email and password sent by the user

  const userDoc = await User.findOne({ userEmail }) // This searches for an existing User using findOne function by their email
  // console.log("userDoc:", userDoc)

  if (userDoc) {
    // If email is found it checks for a password
    const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword) // Using bcrypt we decrypt the password stored in order to compare for validity (form_pasword, stored_password)
    if (passOk) {
      // If password is correct it follows through
      jwt.sign(
        // we use the sign function from JSONWebToken
        {
          userEmail: userDoc.userEmail,
          id: userDoc._id,
          userName: userDoc.userName,
        }, // User payload: string | Buffer | object,
        jwtSecret, // secretOrPrivateKey: Secret
        {}, // Empty parameters, options: SignOptions
        (err, token) => {
          // We catch error and the session token
          if (err) throw err // If there's an error we send it
          res.cookie("token", token, { httpOnly: true }).json({
            userEmail: userDoc.userEmail,
            id: userDoc._id,
            userName: userDoc.userName,
            userRoles: userDoc.userRoles,
          }) // If it goes through we create the session cookie with the corresponding token
        } // callback: SignCallback
      )
    } else {
      // If password is correct it shows message
      //console.log("Contraseña incorrecta:", userEmail)
      res.status(422).json("Contraseña incorrecta")
    }
  } else {
    // If email doesn't exists it shows message
    // console.log("Usuario no encontrado para el correo:", userEmail)
    return res.status(422).json("Correo no existe")
  }
})

/* *************************
 *     /profile
 *     This endpoint handles profile redirection from the login when it succeeded, validates the information and uses get*/
app.get("/api/profile", (req, res) => {
  // We listen to /profile with a get function
  const { token } = req.cookies // We require from the session the cookies
  if (token) {
    // If the token is retreived correctly we go through
    jwt.verify(
      // We verify the jwt
      token, //token: string
      jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret
      {}, // options?: VerifyOptions & { complete?: false }
      async (err, userData) => {
        // callback?: VerifyCallback<JwtPayload | string>
        // We catch error and the user data
        if (err) throw err // If there's an error we send it
        const { userName, userEmail, id, userRoles } = await User.findById(
          userData.id
        ) // We retrive the name, email and id from the database by finding it by id
        res.json({ userName, userEmail, id, userRoles }) // We give as a response the name, email and id
      }
    )
  } else {
    // If not we send an error
    res.json(null)
  }
})

/* *************************
 *     /logout
 *     This endpoint handles logout from the sidebar, when it succeeded, validates the information and uses post*/
app.post("/api/logout", (req, res) => {
  // We listen to /logout with a post function
  res.cookie("token", "").json(true) // Set the stored token to an empty one
})

/* *************************
 *     /cursos
 *     This endpoint handles cursos from the form, when it succeeded, validates the information and uses post*/
app.post("/api/cursos", (req, res) => {
  // We listen to /cursos with a post function
  const { token } = req.cookies // We require from the session the token cookie
  const {
    course_name,
    course_description,
    course_category,
    course_extrainfo,
    course_neurodiv,
  } = req.body // We require from the form the course_name, course_description, course_category, course_extrainfo and course_neurodiv sent by the user

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
        course_tutor_id: userData.id,
        course_tutor_name: userData.name,
        course_name,
        course_description,
        course_category,
        course_extrainfo,
        course_neurodiv,
      }) // We create a course using the Course model by inserting the data sent by user and data from the user (id and name)
    }
  )
})

/* *************************
 *     /cursos
 *     This endpoint handles cursos, when it succeeded, validates the information and uses get to */
app.get("/api/cursos", (req, res) => {
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

      res.json(await Course.find({ course_tutor_id: id })) // We find the courses created by the logged in tutor
    }
  )
})

/* *************************
 *     /cursos:id
 *     This endpoint handles cursos with the id info, when it succeeded, validates the information and uses get to obtain the detailed information */
app.get("/api/cursos/:id", async (req, res) => {
  // We listen to /cursos with an async get function
  const { id } = req.params // We require the id parameter
  res.json(await Course.findById(id)) // We find the data from the Course model with the specific id
})

/* *************************
 *     /cursos
 *     This endpoint handles cursos with the id info, when it succeeded, validates the information and uses put to update the information */
app.put("/api/cursos", async (req, res) => {
  // We listen to /cursos with an async put function
  const { token } = req.cookies // We require from the session the token cookie
  const {
    id,
    course_name,
    course_description,
    course_category,
    course_extrainfo,
    course_neurodiv,
  } = req.body // We require from the form the id, course_name, course_description, course_category, course_extrainfo and course_neurodiv sent by the user

  jwt.verify(
    // We verify the jwt
    token, // token: string,
    jwtSecret, // secretOrPublicKey: Secret | GetPublicKeyOrSecret,
    {}, // options?: VerifyOptions & { complete?: false },
    async (err, userData) => {
      // callback?: VerifyCallback<JwtPayload | string>,
      if (err) throw err // If there's an error we send it

      const courseDoc = await Course.findById(id) // We find by id the course in the Course model

      if (userData.id === courseDoc.course_tutor_id.toString()) {
        // We are comparing the logged in user with the tutor id registered in the course
        // If it is true (the id is the same) we set the new values
        courseDoc.set({
          course_name,
          course_description,
          course_category,
          course_extrainfo,
          course_neurodiv,
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

/* *************************
 *     /cursos-eliminar:id
 *     This endpoint handles the deletion of courses with the id, when it succeeded, validates the information and uses delete to erase from database the information */
app.delete("/api/cursos-eliminar/:id", async (req, res) => {
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

        if (userData.id === courseDoc.course_tutor_id.toString()) {
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

/* *************************
 *   Scheduled function to count the number of registered users and courses
 *   This job is executed every 12 hours */
const job = schedule.scheduleJob("* 12 * * *", async function () {
  // We send to the server console that the job is executing
  console.log("Contando usuarios y cursos...")

  try {
    //const tutorCount = await User.countDocuments({ role: "tutor" });
    const userCount = await User.countDocuments({}) // We count the registered users in the User model
    const cursosCount = await Course.countDocuments({}) // We count the registered courses in the Course model
    // We send to the server console the numbers
    console.log("Usuarios totales:", userCount)
    console.log("Cursos totales:", cursosCount)
  } catch (err) {
    // if there's an error we send it
    console.error(err)
  }
})

/* *************************
 *     /cuenta-datos
 *     This endpoint handles the count of users and courses with the id, when it succeeded, validates the information and uses get to send the information */
app.get("/api/cuenta-datos", async (req, res) => {
  // We listen to /cuenta-datos with an async get function
  try {
    //const tutorCount = await User.countDocuments({ role: "tutor" });
    const userCount = await User.countDocuments({}) // We count the registered users in the User model
    const cursoCount = await Course.countDocuments({}) // We count the registered courses in the Course model

    res.json({ totalUsers: userCount, totalCursos: cursoCount }) // We send a response with the data
  } catch (err) {
    // if there's an error we send it
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
