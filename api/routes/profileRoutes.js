/* EXPRESSJS
 * This is what we are using to code the API */
const express = require("express")
const router = express.Router()
router.use(express.json()) // This is used to parse every JSON for express usage
router.use(express.urlencoded({ extended: true }))

/*    IMPORTS AND DECLARATIONS
 *    These are the imports and declaration in this file */

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

/* JSONWebToken
 * Self-contained way for securely transmitting information between parties as a JSON object*/
//const jwt = require("jsonwebtoken") // import
//const jwtSecret = "AOi3ejk34io" // jwt secret token, it is randomly typed

/* Cookieparser
 * Parse and handle HTTP cookies that are sent between the client and the server.  */
const cookieParser = require("cookie-parser") // import
router.use(cookieParser()) // This is to create an instance of the cookieparser

//verify
const {verifyToken} = require('./../middleware/authHandler')

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*    /profile
 *     This endpoint handles profile redirection from the login when it succeeded, validates the information and uses get*/
router.get("/", async (req, res) => {
  try {
    const { token } = req.cookies;

    if (token) {
      const userData = await verifyToken(token); // Verifica el token JWT

      const { userName, userEmail, id, userRoles, userDate, userAvailable } = await User.findById(userData.id);
      res.json({ userName, userEmail, id, userRoles, userDate, userAvailable });
    } else {
      res.json(null);
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error en la obtención del perfil del usuario.");
  }
});


module.exports = router
