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
// router.post("/", async (req, res) => {
//   // We listen to /login with an async post funcion
//   const { userEmail, userPassword } = req.body // We require from the form the name, email and password sent by the user

//   const userDoc = await User.findOne({ userEmail }) // This searches for an existing User using findOne function by their email
//   // console.log("userDoc:", userDoc)

//   if (userDoc) {
//     // If email is found it checks for a password
//     const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword) // Using bcrypt we decrypt the password stored in order to compare for validity (form_pasword, stored_password)
//     if (passOk) {
//       // If password is correct it follows through
//       jwt.sign(
//         // we use the sign function from JSONWebToken
//         {
//           userEmail: userDoc.userEmail,
//           id: userDoc._id,
//           userName: userDoc.userName,
//           userRoles: userDoc.userRoles,
//         }, // User payload: string | Buffer | object,
//         jwtSecret, // secretOrPrivateKey: Secret
//         {}, // Empty parameters, options: SignOptions
//         (err, token) => {
//           // We catch error and the session token
//           if (err) throw err // If there's an error we send it
//           res
//             .cookie("token", token, {
//               httpOnly: true,
//               sameSite: "None",
//               secure: true,
//             })
//             .json({
//               userEmail: userDoc.userEmail,
//               id: userDoc._id,
//               userName: userDoc.userName,
//               userRoles: userDoc.userRoles,
//             }) // If it goes through we create the session cookie with the corresponding token
//         } // callback: SignCallback
//       )
//     } else {
//       // If password is correct it shows message
//       //console.log("Contraseña incorrecta:", userEmail)
//       res.status(422).json("Contraseña incorrecta")
//     }
//   } else {
//     // If email doesn't exists it shows message
//     // console.log("Usuario no encontrado para el correo:", userEmail)
//     return res.status(422).json("Correo no existe")
//   }
// })

router.post("/", async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const userDoc = await User.findOne({ userEmail });

  if (userDoc) {
    const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);

    if (passOk) {
      try {
        const token = await generateAuthToken(userDoc); // Generar el token JWT

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
          });
      } catch (err) {
        console.error("Error generando el token:", err);
        res.status(500).json("Error en el servidor");
      }
    } else {
      res.status(422).json("Contraseña incorrecta");
    }
  } else {
    return res.status(422).json("Correo no existe");
  }
})

module.exports = router
