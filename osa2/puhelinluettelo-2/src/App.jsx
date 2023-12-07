import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
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
  const result = (contacts.length) ? contacts.filter(person =>
    person.name.toLowerCase().includes(filterWith.toLowerCase())) : [];
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
  const [persons, setPersons] = useState([])
  const [filterWithStr, setFilterWithStr] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        alert(`Failed to retrieve initial state from the server: ${error}`)
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault()
    if (checkForDuplicates() != -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(newPerson)
        .then(rPerson => {
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(rPerson))
        })
        .catch(error => {
          alert(`Failed to add ${newName} to server: ${error}`)
        })      
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
        addPerson={addPerson}
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