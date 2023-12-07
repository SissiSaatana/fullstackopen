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

const DisplayContacts = ({contacts, remove, filterWith}) => {
  console.log(contacts);
  const result = (contacts.length) ? contacts.filter(person =>
    person.name.toLowerCase().includes(filterWith.toLowerCase())) : [];
  return (
    <>
      <h1>Numbers</h1>
      {result.map(contact => 
        <p key={contact.name}>
          {contact.name} {contact.number}
          <button onClick={() => remove(contact.id)}>Poista</button>
        </p>
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
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const duplicateIndex = checkForDuplicates()

    if (duplicateIndex != -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(persons[duplicateIndex].id, newPerson)
          .then(rPerson => {
            setPersons(persons.filter(p => p.id != persons[duplicateIndex].id).concat(rPerson))
          })
          .catch(e => {
            alert(`updating person ${newName} failed with error: ${e}`)
          })
      }
    } else {      
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

  const removePerson = id => {
    const personToBeRemoved = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToBeRemoved.name} ?`)) {
      personService
        .remove(id)
        .then(data => {
          console.log(data)
          setPersons(persons.filter(person =>
            person.id != id)) 
        })
        .catch(error => {
          console.log('error:', error)
        })
    }    
  }


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
      <DisplayContacts 
        contacts={persons}
        remove={removePerson}
        filterWith={filterWithStr}
      />
    </div>
  )
}

export default App