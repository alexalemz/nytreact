import React from "react";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      NYT React App
    </a>
    <div className="ml-4">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className={ window.location.pathname === "/" ? "nav-link active" : "nav-link" } href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className={ window.location.pathname === "/saved" ? "nav-link active" : "nav-link" } href="/saved">
            Saved Articles
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
