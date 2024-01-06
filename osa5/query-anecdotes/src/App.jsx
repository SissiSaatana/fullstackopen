import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { getAnecdotes, createAnecdote } from './requests'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }
  let anecdotes = []

  const getAnecdotesRes = useQuery({
    queryKey: ['get-anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(getAnecdotesRes)))
  if (getAnecdotesRes.status === 'success')
    anecdotes = getAnecdotesRes.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
