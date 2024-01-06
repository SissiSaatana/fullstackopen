/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    postAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { 
  postAnecdote,
  voteAnecdote,
  appendAnecdote,
  setAnecdotes
} = anecdoteSlice.actions
export default anecdoteSlice.reducer
