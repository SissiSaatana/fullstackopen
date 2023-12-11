require('dotenv').config()  

const express = require('express')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

var morgan = require('morgan')
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Persons = require('./models/persons')

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Persons.find({}).then(p => res.json(p))
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Persons.find({ _id:id }).then(p => res.json(p))
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  console.log('req.body', req.body)
  
  if (!person.name || !person.number) {
    res.status(400)
    res.json({ error: 'missing name or number' })
    return
  }

  Persons.find({ name:person.name }).then(p => {
    if (p.length) {
      console.log('pls give unique name!')
      res.status(405)
      res.json({error: 'name must be unique'})    
    } else {
      const postPerson = new Persons(person)
      postPerson.save().then(result => {
        res.status(201)
        res.json(result)
      })
    }
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = req.body
  Persons.findByIdAndUpdate(req.params.id, person, { new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Persons.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(e => next(e))
})

app.get('/info', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  Persons.find({}).then(p => { 
    res.end(`
    Phonebook has info for ${p.length} people

    ${new Date()}
  `)
  })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })  

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
