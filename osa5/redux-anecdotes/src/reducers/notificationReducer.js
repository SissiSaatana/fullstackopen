import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const { set } = notificationSlice.actions

export const setNotification = (msg, displayTime)  => {
  return dispatch => {
    dispatch(set(msg))
    setTimeout(() => dispatch(setNotification('')), displayTime * 1000)
  }
}

export default notificationSlice.reducer
