/* --------------------------------------------
            IMPORTS AND DECLARATIONS */

// ExpressJS
const express = require('express')
const app = express()
// Parse json
app.use(express.json())

// CORS
const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

// Mongo connection
// WdiVlejzjG8dwuBt
const { default: mongoose } = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)
// Mongoose models
const User = require('./models/User')

// BCRYPTJS
const bcrypt = require('bcryptjs')
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'AOi3ejk34io'

// Jsonwebtoken
const jwt = require('jsonwebtoken')

// cookieparser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

/* --------------------------------------------
                ENDPOINTS TO API */


/* *************************
            Test */
app.get('/test', (req, res) => {
    res.json('test ok')
})

/* *************************
            Register */
app.post('/register', async (req, res) => {
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
app.post('/login', async (req, res) => {
    // Variables
    const { email, password } = req.body
    // Look for email in DB
    const userDoc = await User.findOne({ email })

    if (userDoc) {
        // if email exists it checks password
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            // if password is correct it creates cookie, etc
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
                name: userDoc.name
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err
                res.cookie('token', token).json(userDoc)
            })
        } else {
            // if password is correct it shows message
            res.status(422).json('Contraseña incorrecta')
        }
    } else {
        // if email doesn't exists it shows message
        res.json('Correo no existe')
    }
})

/* *************************
            Profile */
app.get('/profile', (req, res) => {
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

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.listen(4000)