import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdoteServices'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const AddAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    const res = await anecdoteServices.createNew(anecdote)
    dispatch(createAnecdote(res))
    dispatch(setNotification(`Added anecdote: ${res}`))
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