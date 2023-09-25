import React from "react";
import { NavLink } from "react-router-dom";

const UserButton = (props) => {
  const { href, content, pic, handler } = props;

  return (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        onClick={handler}
        to={"/" + href}
        style={{ fontSize: "1.25rem" }}
      >
        <img
          className="img-responsive me-2"
          src={pic}
          alt={pic}
          style={{ height: "1.75rem" }}
        />
        {content}
      </NavLink>
    </li>
  );
};

export default UserButton;
