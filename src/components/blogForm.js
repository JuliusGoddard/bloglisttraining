import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = event => {
    setAuthor(event.target.value);
  };

  const addBlog = e => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create a new blogpost</h2>
      <form onSubmit={addBlog}>
        <input id="title" value={title} onChange={handleTitleChange} />
        <input id="author" value={author} onChange={handleAuthorChange} />
        <input id="url" value={url} onChange={handleUrlChange} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
