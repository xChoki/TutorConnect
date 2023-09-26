const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },

  userEmail: {
    type: String,
    unique: true,
    required: true,
  },

  userPassword: {
    type: String,
    required: true,
  },

  userRoles: {
    User: {
        type: Number,
        default: 2001
    },
    Tutor: Number,
    Teacher: Number,
    Admin: Number
  },
  refreshToken: String
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
