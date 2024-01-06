/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdoteServices'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const voteAnecdote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...voteAnecdote,
        votes: voteAnecdote.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : votedAnecdote
      ).sort((a, b) => a.votes < b.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { 
  appendAnecdote,
  voteAnecdote,
  setAnecdotes
} = anecdoteSlice.actions

export const initializeAnecdotes = async (dispatch) => {
  const anecdotes = await anecdoteServices.getAll()
  dispatch(setAnecdotes(anecdotes))
}


export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(anecdote))
    dispatch(setNotification(`Added anecdote: ${anecdote.content}`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}

export default anecdoteSlice.reducer
