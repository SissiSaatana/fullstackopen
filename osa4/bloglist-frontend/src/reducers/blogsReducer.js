const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export const setBlogs = (blogs) => {
  return {
    type: 'SET',
    payload: blogs,
  };
};

export default blogsReducer;
