import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { useReducer } from 'react'
import AnecdoteContext from './components/NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload    
    case 'RESET':
      return {}
    default:
      return state
  }
}

const App = () => {  
  const [notification, notificationDispatch] = useReducer(notificationReducer, {})

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3>    
      <Notification />
      <AnecdoteForm />      
      <AnecdoteList />
    </AnecdoteContext.Provider>
  )
}

export default App
