const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    default:
      return state;
  }
};

export const setNotification = (msg) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: msg,
  };
};

export default notificationReducer;
