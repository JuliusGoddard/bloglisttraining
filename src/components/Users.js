import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <div>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}> {u.username}</Link> {u.blogs.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
