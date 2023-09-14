/* --------------------------------------------
            IMPORTS AND DECLARATIONS */
// Node schedule
const schedule = require("node-schedule")
// ExpressJS
const express = require("express")
const app = express()
// Parse json
app.use(express.json())

// CORS
const cors = require("cors")
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
)

// Mongo connection
// WdiVlejzjG8dwuBt
const { default: mongoose, Mongoose } = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGO_URL)
// Mongoose models
const User = require("./models/User")
const Course = require("./models/Course")

// BCRYPTJS
const bcrypt = require("bcryptjs")
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "AOi3ejk34io"

// Jsonwebtoken
const jwt = require("jsonwebtoken")

// cookieparser
const cookieParser = require("cookie-parser")
app.use(cookieParser())

/* --------------------------------------------
                ENDPOINTS TO API */

/* *************************
            Test */
app.get("/test", (req, res) => {
  res.json("test ok")
})

/* *************************
            Register */
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })

    res.json(userDoc)
  } catch (e) {
    res.status(422).json(e)
  }
})

/* *************************
            Login */
app.post("/login", async (req, res) => {
  // Variables
  const { email, password } = req.body
  // Look for email in DB
  const userDoc = await User.findOne({ email })

  if (userDoc) {
    // if email exists it checks password
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
      // if password is correct it creates cookie, etc
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie("token", token).json(userDoc)
        }
      )
    } else {
      // if password is correct it shows message
      res.status(422).json("Contraseña incorrecta")
    }
  } else {
    // if email doesn't exists it shows message
    res.json("Correo no existe")
  }
})

/* *************************
            Profile */
app.get("/profile", (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, id } = await User.findById(userData.id)
      res.json({ name, email, id })
    })
  } else {
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
