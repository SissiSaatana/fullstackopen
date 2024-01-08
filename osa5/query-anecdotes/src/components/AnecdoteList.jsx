import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation  = useMutation({
    mutationFn: updateAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    anecdote.votes += 1
    updateAnecdoteMutation.mutate(anecdote)
  }
  let anecdotes = []

  const getAnecdotesRes = useQuery({
    queryKey: ['get-anecdotes'],
    queryFn: getAnecdotes
  })

  if (getAnecdotesRes.status === 'success') {
    anecdotes = getAnecdotesRes.data
    anecdotes.sort((a, b) => a.votes < b.votes)
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
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList
