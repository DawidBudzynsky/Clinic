import React from "react";

export default function Navbar() {
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
          <li className="nav-item">
            <a className="nav-link" href="/doctors">
              Doctors
            </a>

          </li>
          <li>
            <a className="nav-link" href="/schedules">
              Schedules
            </a>
          </li>
          {/* <li className="nav-item dropdown"> */}
          {/*   <a */}
          {/*     className="nav-link dropdown-toggle" */}
          {/*     href="#" */}
          {/*     id="navbarDropdownMenuLink" */}
          {/*     role="button" */}
          {/*     data-bs-toggle="dropdown" */}
          {/*     aria-haspopup="true" */}
          {/*     aria-expanded="false" */}
          {/*   > */}
          {/*     Dropdown link */}
          {/*   </a> */}
          {/*   <div */}
          {/*     className="dropdown-menu" */}
          {/*     aria-labelledby="navbarDropdownMenuLink" */}
          {/*   > */}
          {/*     <a className="dropdown-item" href="/doctors"> */}
          {/*       Doctors */}
          {/*     </a> */}
          {/*     <a className="dropdown-item" href="#"> */}
          {/*       Another action */}
          {/*     </a> */}
          {/*     <a className="dropdown-item" href="#"> */}
          {/*       Something else here */}
          {/*     </a> */}
          {/*   </div> */}
          {/* </li> */}
        </ul>
      </div>
    </nav>
  );
}
