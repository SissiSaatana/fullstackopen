/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)
module.exports = User