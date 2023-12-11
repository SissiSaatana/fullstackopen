const mongoose = require('mongoose')
require('dotenv').config()  

mongoose.set('strictQuery', false)

const url = `mongodb+srv://SissiSaatana:6f4ZdIkDLFJnGIy2@fso.uycnwk2.mongodb.net/?retryWrites=true&w=majority`

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {    console.log('connected to MongoDB')  })
  .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 3,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)