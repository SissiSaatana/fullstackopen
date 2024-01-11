import { createSlice } from '@reduxjs/toolkit';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export const setBlogs = (blogs) => {
  console.log('setBlogs blogs', blogs);
  return {
    type: 'SET',
    payload: blogs,
  };
};

export default blogsReducer;
