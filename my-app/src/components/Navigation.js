import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-link active" : "nav-link")}
        >
          <li>Accueil</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
