const express = require('express')
const app = express()


app.use(express.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "mymy",
    "number": "112",
    "id": 5
  },
  {
    "name": "jymy",
    "number": "911",
    "id": 6
}
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id ===id)
  if (person) 
    res.json(person)
  else 
    res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  console.log(req)
  const person = req.body.person
  person.id = Math.floor(Math.random() * 99999)
  console.log(person)
  persons.push(person)
  res.status(204).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id ===id)
  persons = persons.filter(p => p.id !== id)
  if (person) 
    res.status(204).end()
  else 
    res.status(404).end()
})



app.get('/info', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(`
    Phonebook has info for ${persons.length} people

    ${new Date()}
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})