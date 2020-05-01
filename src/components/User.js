import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const User = () => {
  const users = useSelector(state => state.users);

  const match = useRouteMatch("/users/:id");

  const user = match ? users.find(user => user.id === match.params.id) : null;

  console.log(users);

  if (!user) {
    return null;
  } else {
    return (
      <div>
        <h1>{user.username}</h1> <h2>Added Blogs</h2>
        <ul>
          {user.blogs.map(b => (
            <li key={b.id}>
              <h2>{b.title}</h2>
              <p>{b.url}</p>
              <p>{b.author}</p>
              <p>{b.likes}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
export default User;
