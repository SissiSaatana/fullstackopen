import { useDispatch } from 'react-redux'
import { postAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const AddAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(postAnecdote(anecdote))
    dispatch(setNotification(`Added anecdote: ${anecdote}`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }

  return (
    <form onSubmit={AddAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm