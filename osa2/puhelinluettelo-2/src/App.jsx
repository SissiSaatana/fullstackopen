import { useState } from 'react'

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={(e) => handleNameChange(e)}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={(e) => handleNumberChange(e)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const DisplayContacts = ({contacts, filterWith}) => {
  console.log(contacts);
  const result = contacts.filter(person =>
    person.name.toLowerCase().includes(filterWith.toLowerCase()))
  return (
    <>
      <h1>Numbers</h1>
      {result.map(contact => 
        <p key={contact.name}>{contact.name} {contact.number}</p>
      )}
    </>
  )
}

const FilterPersons = ({handleFilterChange}) =>
  <div>
    filter shown with 
    <input 
      onChange={(e) => handleFilterChange(e.target.value)}
    />
  </div>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filterWithStr, setFilterWithStr] = useState('') 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (checkForDuplicates() != -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      setNewName('')
      setNewNumber('')
      setPersons(persons.concat(newPerson))
    }    
  }

  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  const filterChange = (filterWith) =>
    setFilterWithStr(filterWith)

  const checkForDuplicates = () => 
    persons.findIndex(person => person.name.toLowerCase() == newName)


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons handleFilterChange={filterChange}/>
      <PersonForm 
        addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />      
      <DisplayContacts contacts={persons} filterWith={filterWithStr} />
    </div>
  )
}

export default App