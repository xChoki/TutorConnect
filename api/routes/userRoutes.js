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
const User = require("../models/User") // Model for Users

/* Cookieparser
 * Parse and handle HTTP cookies that are sent between the client and the server.  */
const cookieParser = require("cookie-parser") // import
router.use(cookieParser()) // This is to create an instance of the cookieparser

const bcrypt = require("bcryptjs") // import
const bcryptSalt = bcrypt.genSaltSync(10) // Generate salt with a length of 10

const { generateAuthToken } = require("./../middleware/authHandler")
//verify
const { verifyToken } = require("./../middleware/authHandler")

router.put("/update-password/:id", async (req, res) => {
  try {
    const { token } = req.cookies
    const { id } = req.params
    const { userPassword, userNewPassword } = req.body

    const userData = await verifyToken(token)

    if (!userData) {
      return res.status(203).json("No autorizado")
    }

    const userDoc = await User.findById(id)

    if (!userDoc) {
      return res.status(404).json("Usuario no encontrado")
    }

    const isPasswordCorrect = bcrypt.compareSync(userPassword, userDoc.userPassword)

    if (isPasswordCorrect) {
      // Excluye el campo userDate al actualizar la contraseña
      userDoc.set({
        userPassword: bcrypt.hashSync(userNewPassword, bcryptSalt),
      })

      await userDoc.save() // Guarda el documento modificado

      res.json("Contraseña actualizada")
    } else {
      res.status(400).json("La contraseña actual es incorrecta")
    }
  } catch (err) {
    console.error("Error:", err)
    res.status(500).send("Error al actualizar la contraseña.")
  }
})

//update username
router.put("/update-username/:id", async (req, res) => {
  try {
    const { token } = req.cookies
    const { id } = req.params
    const { userNewName } = req.body

    const userData = await verifyToken(token)

    if (!userData) {
      return res.status(203).json("No autorizado")
    }

    const userDoc = await User.findById(id)

    if (!userDoc) {
      return res.status(404).json("Usuario no encontrado")
    } else {
      userDoc.set({
        userName: userNewName,
      })
      await userDoc.save() // Guarda el documento modificado
      res.json("Nombre de usuario actualizado")
    }
  } catch (err) {
    console.error("Error:", err)
    res.status(500).send("Error al actualizar nombre de usuario.")
  }
})

//update email
router.put("/update-email/:id", async (req, res) => {
  try {
    const { token } = req.cookies
    const { id } = req.params
    const { userNewEmail } = req.body

    const userData = await verifyToken(token)

    if (!userData) {
      return res.status(203).json("No autorizado")
    }

    const userDoc = await User.findById(id)
    const userByEmail = await User.findOne({ userNewEmail })

    if (!userDoc) {
      return res.status(404).json("Usuario no encontrado")
    } else {
      if (userByEmail) {
        return res.status(201).json("Este correo ya existe")
      } else {
        userDoc.set({
          userEmail: userNewEmail,
        })
        await userDoc.save() // Guarda el documento modificado
        res.json("Email actualizado")
      }
    }
  } catch (err) {
    console.error("Error:", err)
    res.status(500).send("Error al actualizar email.")
  }
})

router.put("/deactivate/:id", async (req, res) => {
  try {
    const { token } = req.cookies
    const { id } = req.params

    const userData = await verifyToken(token)

    if (!userData) {
      return res.status(203).json("No autorizado")
    }

    const userDoc = await User.findById(id)

    if (!userDoc) {
      return res.status(404).json("Usuario no encontrado")
    } else {
      userDoc.set({
        userAvailable: false,
      })
      await userDoc.save() // Guarda el documento modificado
      res.json("Usuario desactivado")
    }
  } catch (error) {
    console.error(error)
  }
})

router.get("/test/:id", async (req, res) => {
  res.json("test Ok")
})

module.exports = router
