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
const User = require("../models/User") // Model for Users

/* BCRYPTJS
 * It is used to give encrypted tokens to later use in cookies, etc. */
const bcrypt = require("bcryptjs") // import

/* JSONWebToken
 * Self-contained way for securely transmitting information between parties as a JSON object*/
const jwt = require("jsonwebtoken") // import
const jwtSecret = "AOi3ejk34io" // jwt secret token, it is randomly typed

const {generateAuthToken} = require('./../middleware/authHandler')

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*    /login
*     This endpoint handles login form, validates the information and uses post*/
router.post("/", async (req, res) => {// We listen to /login with an async post funcion
  const { userEmail, userPassword } = req.body; // We require from the form the name, email and password sent by the user

  // This searches for an existing User using findOne function by their email
  const userDoc = await User.findOne({ userEmail });

  if (userDoc && userDoc.userAvailable === true) {
    // If email is found it checks for a password
    const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);

    if (passOk) {
      try {
        const token = await generateAuthToken(userDoc); // Generate token JWT

        res
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .json({
            userEmail: userDoc.userEmail,
            id: userDoc._id,
            userName: userDoc.userName,
            userRoles: userDoc.userRoles,
          }); // If it goes through we create the session cookie with the corresponding token
      } catch (err) {
        console.error("Error generando el token:", err);
        res.status(500).json("Error en el servidor");
      }
    } else {
      res.status(422).json("Contraseña incorrecta");// If password is correct it shows message
    }
  } else {
    return res.status(422).json("Correo no existe"); // If email doesn't exists it shows message
  }
})

module.exports = router
