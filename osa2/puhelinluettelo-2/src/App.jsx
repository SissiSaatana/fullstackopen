import { useState, useEffect } from 'react'
import personService from './services/persons'


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
  let result;
    if (contacts.length) {
      result = contacts.filter(person =>
        person.name.toLowerCase().includes(filterWith.toLowerCase()))
    } else {
      result = [];
    } 
     
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

const FeedbackMsg = ({msg}) => {
  let msgStyle;

  if (msg.msg === '') 
    return;
  
  if (msg.type ==='success') {
    msgStyle = {
      border: '2px solid green',
      borderRadius: '5px',
      color: 'green',
      fontSize: 16,
      padding: '.4em'
    }
  } else if (msg.type ==='error') {
    msgStyle = {
      border: '2px solid red',
      color: 'red',
      fontSize: 16,
      padding: '.4em'
    }
  }
  
  return (
    <p style={msgStyle}>{msg.msg}</p>
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
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [filterWithStr, setFilterWithStr] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState({msg: '', type: ''})  


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
            setFeedbackMsg({msg:`Updated person ${rPerson.name}`, type:'success'});
            timeoutFeedbackMsg();
          })
          .catch(error => {
            setFeedbackMsg({msg:`updating person ${newName} failed. Error: ${error}`, type:'error'});
          })
      }
    } else {      
      personService
        .create(newPerson)
        .then(rPerson => {
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(rPerson))
          setFeedbackMsg({msg:`Added person ${rPerson.name}`, type:'success'});
          timeoutFeedbackMsg();
        })
        .catch(error => {
          setFeedbackMsg({msg:`Failed to add ${newName} to server. Error: ${error}`, type:'error'});
          timeoutFeedbackMsg();
        })      
    }
    
    event.preventDefault()    
  }

  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  const filterChange = (filterWith) =>
    setFilterWithStr(filterWith)

  const checkForDuplicates = () => 
    persons.findIndex(person => person.name.toLowerCase() == newName.toLowerCase())
    

  const timeoutFeedbackMsg = () => 
    setTimeout(() => {
      setFeedbackMsg({msg: '', type: ''})
    }, 5000)
  

  const removePerson = id => {
    const personToBeRemoved = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToBeRemoved.name} ?`)) {
      personService
        .remove(id)
        .then(data => {
          setPersons(persons.filter(person =>
            person.id != id)) 
          setFeedbackMsg({msg:`Removed person ${personToBeRemoved.name}`, type:'success'});
          timeoutFeedbackMsg();
        })
        .catch(error => {
          console.log('error:', error)
          setFeedbackMsg({msg:`Failed to remove person ${personToBeRemoved.name}. Error: ${error}`, type:'error'});
          timeoutFeedbackMsg();
        })
    }    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <FeedbackMsg msg={feedbackMsg} />
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