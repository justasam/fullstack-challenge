import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar_wrapper">
      <h3 className="logo">Cakes!</h3>
      <ul className="navbar_list">
        <li>
          <NavLink activeClassName="is-active" to="/Home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="is-active" to="/New">
            Add Cake
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
