import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function MyNavbar() {
  const token = sessionStorage.getItem("accessToken");
  const group = sessionStorage.getItem("userGroup");
  return (

    <Navbar
      expand="lg"
      className="px-5 bg-body-tertiary d-flex justify-content-between"
    >
      <Container className="px-5">
        <Navbar.Brand href="/" className="gradient-text">
          Clinic-Application
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/doctors">Doctors</Nav.Link>
            <Nav.Link href="/schedules">Schedules</Nav.Link>
            <Nav.Link href="/visits">Visits</Nav.Link>
            {group === "User" ? (
              <Nav.Link href="/my_visits">My Visits</Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container className="d-flex justify-content-end px-5 mx-5">
        <Navbar.Collapse className="justify-content-end">
          {token ? (
            <div className="d-flex justify-content-between">
              <Navbar.Text className="px-2">
                <Nav.Link href="/profile">Your Profile</Nav.Link>
              </Navbar.Text>
              <Navbar.Text className="px-2">
                <Nav.Link href="/logout">Log out</Nav.Link>
              </Navbar.Text>
            </div>
          ) : (
            <Navbar.Text>
              <a href="/login">Login</a>
            </Navbar.Text>
          )}
        </Navbar.Collapse>{" "}
      </Container>
    </Navbar>
    // <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
    //   <a className="navbar-brand" href="#">
    //     Navbar
    //   </a>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-bs-toggle="collapse"
    //     data-bs-target="#navbarNavDropdown"
    //     aria-controls="navbarNavDropdown"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNavDropdown">
    //     <ul className="navbar-nav">
    //       <li className="nav-item active">
    //         <a className="nav-link" href="/user_home">
    //           Home <span className="sr-only"></span>
    //         </a>
    //       </li>
    //       <li>
    //         <a className="nav-link" href="/schedules">
    //           Schedules
    //         </a>
    //       </li>
    //       {group === 'Admin' ? (
    //         <li>
    //           <a className="nav-link" href="/doctors">
    //             Doctors
    //           </a>
    //         </li>
    //       ) : null}
    //       <li>
    //         <a className="nav-link" href="/visits">
    //           Visits
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}
