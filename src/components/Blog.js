import React from "react";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from "@material-ui/core";

const Blog = ({ blog, title, author, url, likes }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

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

  const deleteBlog = async id => {
    const deletedBlog = await blogService.deleteBlog(id);
    dispatch(deleteBlog(deletedBlog));
  };

  return (
    <div>
      <h2>blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>{blog.author} </TableCell>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
                </TableCell>
                <TableCell>{blog.url} </TableCell>
                <TableCell>likes: {blog.likes}</TableCell>
                <TableCell>
                  <button
                    onClick={() =>
                      addLike(
                        blog.id,
                        blog.author,
                        blog.title,
                        blog.url,
                        blog.likes
                      )
                    }
                  >
                    Like
                  </button>
                </TableCell>
                <TableCell>
                  <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blog;
