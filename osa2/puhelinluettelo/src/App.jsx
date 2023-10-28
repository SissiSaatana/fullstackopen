import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  
  const addPerson = (event) => {
    event.preventDefault()

    if (checkIfAlreadyExist(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName }
      setPersons(persons.concat(newPerson))
    }
  }

  const handleNameChange = (event) => 
    setNewName(event.target.value)

  const checkIfAlreadyExist = (name) => {
    const found = persons.findIndex((element) => element.name === name);
    console.log('found: ', found)
    return (found == -1) ? false : true
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App