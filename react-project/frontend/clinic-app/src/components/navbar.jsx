import React from "react";
import { useState } from "react";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(() => {
    const isAdminString = sessionStorage.getItem("isAdmin");
    return isAdminString ? JSON.parse(isAdminString) : false;
  });
  console.log(isAdmin)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only"></span>
            </a>
          </li>
          {isAdmin ? (
            <li className="nav-item">
              <a className="nav-link" href="/doctors">
                Doctors
              </a>
            </li>
          ) : null}
          <li>
            <a className="nav-link" href="/schedules">
              Schedules
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
