import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const SignedInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/create">New Post</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating orange lighten-2">
          XX
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
