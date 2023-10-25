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
const jwt = require("jsonwebtoken") // import
const jwtSecret = "AOi3ejk34io" // jwt secret token, it is randomly typed

/* Cookieparser
 * Parse and handle HTTP cookies that are sent between the client and the server.  */
const cookieParser = require("cookie-parser") // import
router.use(cookieParser()) // This is to create an instance of the cookieparser

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*    /profile
 *     This endpoint handles profile redirection from the login when it succeeded, validates the information and uses get*/
router.get("/", (req, res) => {
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
        const { userName, userEmail, id, userRoles, userDate } = await User.findById(userData.id) // We retrive the name, email and id from the database by finding it by id
        res.json({ userName, userEmail, id, userRoles, userDate }) // We give as a response the name, email and id
      }
    )
  } else {
    // If not we send an error
    res.json(null)
  }
})

module.exports = router
