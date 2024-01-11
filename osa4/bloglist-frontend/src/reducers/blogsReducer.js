const blogsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export const setNotification = (msg) => {
  return {
    type: 'SET',
    payload: msg,
  };
};

export default blogsReducer;
