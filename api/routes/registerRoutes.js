/*    IMPORTS AND DECLARATIONS
 *    These are the imports and declaration in this file */

/* EXPRESSJS
 * This is what we are using to code the API */
const express = require("express")
const router = express.Router()
router.use(express.json()) // This is used to parse every JSON for express usage
router.use(express.urlencoded({ extended: true }))

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
const bcryptSalt = bcrypt.genSaltSync(10) // Generate salt with a length of 10

/*     ENDPOINTS TO API
 *     These correspond to every endpoint that is going to be accessed later in front-end
 *       - get to obtain data
 *       - post to insert or send data
 *       - put to update data
 *       - delete to delete data */

/*    /register
 *     This endpoint handles register form, validates the information and uses post */
router.post("/", async (req, res) => {
  // we listen to /register with an async post function
  const { userName, userEmail, userDate, userPassword } = req.body // We require from the form the name, email and password sent by the user

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
      userDate,
      userPassword: bcrypt.hashSync(userPassword, bcryptSalt),
    }) // This creates a User using the User mongoose model defined beforehand

    res.status(201).json({ success: `El usuario ${userDoc.userName} ha sido creado!` }) // This gives as a response the parsed json
  } catch (e) {
    // in case of an error it send an error message
    res.status(422).json(e) // Error message corresponds to status 422, it means "The request was well-formed but was unable to be followed due to semantic errors."
    console.log(`Error crear usuario ${userEmail}, con error ${e}`)
  }
})

module.exports = router
