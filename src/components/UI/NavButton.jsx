import React from "react";
import { NavLink } from "react-router-dom";

const NavButton = ({ item }) => {
  return (
    <li className="nav-item">
      <NavLink
        to={item.href}
        className={({ isActive }) => {
          return (
            "nav-link " +
            (isActive ? " pb-0 border-bottom border-dark border-2 " : "")
          );
        }}
        style={{ fontSize: "1.25rem" }}
      >
        {item.name}
      </NavLink>
    </li>
  );
};

export default NavButton;
