import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(anecdote => 
      anecdote.content.includes(state.filter))
  )
  
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log(anecdote.id)
    dispatch(voteAnecdote({...anecdote, votes: anecdote.votes + 1}))
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