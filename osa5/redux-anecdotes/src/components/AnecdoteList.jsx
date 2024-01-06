import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(anecdote => 
      anecdote.content.includes(state.filter))
  )
  
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log(anecdote.id)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`Voted for: ${anecdote.content}`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList