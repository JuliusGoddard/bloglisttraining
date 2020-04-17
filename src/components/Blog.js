import React from "react";
const Blog = ({ blog, title, author, url }) => (
  <div key={blog.id} className="blog">
    {blog.title} {blog.author} {blog.url}
  </div>
);

export default Blog;
