import React from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";

const BlogForm = () => {
  const dispatch = useDispatch();
  const newBlogRef = React.createRef();
  const addBlog = async event => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    const newBlog = await blogService.createNew(author, title, url);
    dispatch(createBlog(newBlog));
  };

  return (
    <div>
      <h2>Create a new blogpost</h2>
      <form onSubmit={addBlog} ref={newBlogRef}>
        <input id="title" name="title" />
        <input id="author" name="author" />
        <input id="url" name="url" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
