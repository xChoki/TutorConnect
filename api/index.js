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
app.get("/test", (req, res) => {
  res.json("test ok")
})

/* *************************
 *     /register
 *     This endpoint handles the register form, validates information and uses post */
app.post("/register", async (req, res) => {
  // we listen to /register with an async post function
  const { name, email, password } = req.body // We require from the form the name, email and password sent by the user

  try {
    // We try the connection
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    }) // This creates a User using the User mongoose model defined beforehand

    res.json(userDoc) // This gives as a response the parsed json with the user information
  } catch (e) {
    // in case of an error it send an error message
    res.status(422).json(e) // Error message corresponds to status 422, it means "The request was well-formed but was unable to be followed due to semantic errors."
  }
})

/* *************************
 *     /login
 *     This endpoint handles the login form, validates information and uses post*/
app.post("/login", async (req, res) => {
  // We listen to /login with an async post funcion
  const { email, password } = req.body // We require from the form the name, email and password sent by the user

  const userDoc = await User.findOne({ email }) // This searches for an existing User using findOne function by their email

  if (userDoc) {
    // If email is found it checks for a password
    const passOk = bcrypt.compareSync(password, userDoc.password) // Using bcrypt we decrypt the password stored in order to compare for validity (form_pasword, stored_password)
    if (passOk) {
      // If password is correct it follows through
      jwt.sign(
        // we use the sign function from JSONWebToken
        {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
        }, // User payload: string | Buffer | object,
        jwtSecret, // secretOrPrivateKey: Secret
        {}, // Empty parameters, options: SignOptions
        (err, token) => {
          // We catch error and the session token
          if (err) throw err // If there's an error we send it
          res.cookie("token", token).json(userDoc) // If it goes through we create the session cookie with the corresponding token
        } // callback: SignCallback
      )
    } else {
      // If password is correct it shows message
      res.status(422).json("Contraseña incorrecta")
    }
  } else {
    // If email doesn't exists it shows message
    res.json("Correo no existe")
  }
})

/* *************************
 *     /profile
 *     This endpoint handles the profile redirection from the login when it succeedes, validates information and uses get*/
app.get("/profile", (req, res) => {
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
        const { name, email, id } = await User.findById(userData.id) // We retrive the name, email and id from the database by finding it by id
        res.json({ name, email, id }) // We give as a response the name, email and id
      }
    )
  } else {
    // If not we send an error
    res.json(null)
  }
})

/* *************************
            Logout */
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true)
})

/* *************************
            POST Cursos */
app.post("/cursos", (req, res) => {
  const { token } = req.cookies
  const {
    course_name,
    course_description,
    course_category,
    course_extrainfo,
    course_neurodiv,
  } = req.body

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err
    await Course.create({
      course_tutor_id: userData.id,
      course_tutor_name: userData.name,
      course_name,
      course_description,
      course_category,
      course_extrainfo,
      course_neurodiv,
    })
  })
})

/* *************************
            GET Cursos */
app.get("/cursos", (req, res) => {
  const { token } = req.cookies

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData

    res.json(await Course.find({ course_tutor_id: id }))
  })
})

/* *************************
            GET Cursos:id */
app.get("/cursos/:id", async (req, res) => {
  const { id } = req.params
  res.json(await Course.findById(id))
})

/* *************************
            PUT Cursos */
app.put("/cursos", async (req, res) => {
  const { token } = req.cookies
  const {
    id,
    course_name,
    course_description,
    course_category,
    course_extrainfo,
    course_neurodiv,
  } = req.body

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err

    const courseDoc = await Course.findById(id)

    if (userData.id === courseDoc.course_tutor_id.toString()) {
      courseDoc.set({
        course_name,
        course_description,
        course_category,
        course_extrainfo,
        course_neurodiv,
      })
      await courseDoc.save()

      res.json("Actualización completada")
    }
  })
})

/* *************************
          DELETE cursos-eliminar:id */
app.delete("/cursos-eliminar/:id", async (req, res) => {
  const { token } = req.cookies
  const { id } = req.params

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err

    try {
      const courseDoc = await Course.findById(id)

      if (!courseDoc) {
        return res.status(404).json({ error: "El curso no se encuentra" })
      }

      if (userData.id === courseDoc.course_tutor_id.toString()) {
        await Course.findByIdAndDelete(id)
        res.json({ message: "Curso eliminado exitosamente!" })
      } else {
        res
          .status(403)
          .json({ error: "No cuentas con los permisos para borrar este curos" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Error interno de servidor" })
    }
  })
})

/* *************************
          Scheduled count */
const job = schedule.scheduleJob("* 12 * * *", async function () {
  console.log("Contando usuarios y cursos...")

  try {
    //const tutorCount = await User.countDocuments({ role: "tutor" });
    const userCount = await User.countDocuments({})
    const cursosCount = await Course.countDocuments({})
    console.log("Usuarios totales:", userCount)
    console.log("Cursos totales:", cursosCount)
  } catch (err) {
    console.error(err)
  }
})

/* *************************
          GET cuenta-datos */
app.get("/cuenta-datos", async (req, res) => {
  try {
    //const tutorCount = await User.countDocuments({ role: "tutor" });
    const userCount = await User.countDocuments({})
    const cursoCount = await Course.countDocuments({})

    res.json({ totalUsers: userCount, totalCursos: cursoCount })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(4000)
