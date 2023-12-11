const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =`mongodb+srv://SissiSaatana:${password}@fso.uycnwk2.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})
const Person = mongoose.model('Person', personSchema)
const person = new Person({
  name: process.argv[3],
  phone: process.argv[4],
})

if (person.name && person.phone) {
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.phone} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(p => console.log(`${p.name} ${p.phone}`))
    mongoose.connection.close()
  })
}