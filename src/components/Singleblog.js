import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import blogService from "../services/blogs";

const Singleblog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

  const match = useRouteMatch("/blogs/:id");

  const addComment = async event => {
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    const id = blog.id;
    const newComment = await blogService.addComment(id, comment);
    dispatch(addComment(newComment));
  };

  const addLike = async (id, author, title, url, likes) => {
    const newObject = {
      id: id,
      author: author,
      title: title,
      url: url,
      likes: likes + 1
    };
    const newLike = await blogService.addLike(newObject);
    dispatch(addLike(newLike));
  };

  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null;

  console.log(blog);
  if (!blog) {
    return null;
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <h2>{blog.title}</h2>
        <p> URL: {blog.url}</p>
        <p>
          {" "}
          Likes: {blog.likes}{" "}
          <button
            onClick={() =>
              addLike(blog.id, blog.author, blog.title, blog.url, blog.likes)
            }
          >
            Like
          </button>
        </p>
        <p> Added by: {blog.user.username}</p>
        <h2>Comments</h2>
        <form onSubmit={addComment}>
          <input id="comment" name="comment"></input>
          <button>Add Comment</button>
        </form>
        <ul>
          {blog.comments.map(c => (
            <li key={c.id}>{c.comment}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Singleblog;
