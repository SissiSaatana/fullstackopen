import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation  = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (data) => {      
      queryClient.invalidateQueries({ queryKey: ['get-anecdotes'] })
      notificationDispatch({ type:'SET', payload: {...data, action: 'Created: '} })
      setTimeout(() => notificationDispatch({ type:'RESET'}), 5000)
    },
    onError: (error) => {
      const content = error.response.data.error
      notificationDispatch({ type:'SET', payload: { content , action: 'error: '} })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
