/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdoteServices'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    append(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const anecdote = action.payload
      return state.map(a =>
        a.id !== anecdote.id ? a : anecdote
      ).sort((a, b) => a.votes < b.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { 
  append,
  vote,
  setAnecdotes
} = anecdoteSlice.actions

export const initializeAnecdotes = async (dispatch) => {
  const anecdotes = await anecdoteServices.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteServices.createNew(content)
    dispatch(append(anecdote))
    dispatch(setNotification(`Added anecdote: ${anecdote.content}`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const res = await anecdoteServices.update(anecdote)
    dispatch(vote(res))
    dispatch(setNotification(`voted for anecdote: ${res.content}`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }
}

export default anecdoteSlice.reducer
