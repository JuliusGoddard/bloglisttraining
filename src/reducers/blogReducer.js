//const generateId = () => Number((Math.random() * 1000000).toFixed(0));

import blogService from "../services/blogs";
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.data];
    case "INIT_BLOGS":
      return action.data;
    case "LIKE_BLOG":
      const id = action.data.id;
      {
        const updatedBlogs = state.map(b =>
          b.id === action.data.id ? action.data : b
        );
        return updatedBlogs;
      }
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== id);
    case "ADD_COMMENT":
      const updatedBlogs = state.map(b =>
        b.id === action.data.id ? action.data : b
      );
      return updatedBlogs;
    default:
      return state;
  }
};

export const initializeBlogs = blogs => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const addLike = newObject => {
  return async dispatch => {
    const newLike = await blogService.addLike(newObject);
    dispatch({
      type: "LIKE_BLOG",
      data: newLike
    });
  };
};

export const createBlog = data => {
  return {
    type: "NEW_BLOG",
    data
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    const deletedBlog = await blogService.deleteBlog(id);
    dispatch({
      type: "DELETE_BLOG",
      data: deletedBlog
    });
  };
};

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment);
    dispatch({
      type: "ADD_COMMENT",
      data: updatedBlog
    });
  };
};

export default blogReducer;
