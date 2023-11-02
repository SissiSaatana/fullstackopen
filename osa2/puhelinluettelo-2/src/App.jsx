import { useState } from 'react'

const DisplayContacts = ({contacts}) => {
  console.log(contacts)
  
  return (
    <>
      <h1>Numbers</h1>
      {contacts.map(contact => 
        (<p>{contact.name}</p>)
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
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
      <DisplayContacts contacts={persons} />
    </div>
  )

}

export default App