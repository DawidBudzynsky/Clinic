import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function MyNavbar() {
  const token = sessionStorage.getItem("accessToken");
  const group = sessionStorage.getItem("userGroup");

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userData");
    window.location.href = "/login";
  };
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
            {group === "Admin" && (
              <>
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/doctors">Doctors</Nav.Link>
                <Nav.Link href="/schedules">Schedules</Nav.Link>
                <Nav.Link href="/visits">Visits</Nav.Link>
                <Nav.Link href="/my_visits">My Visits</Nav.Link>
              </>
            )}
            {group === "Doctor" && (
              <>
                <Nav.Link href="/my_visits">My Visits</Nav.Link>
              </>
            )}
            {group === "User" && (
              <>
                <Nav.Link href="/visits">Visits</Nav.Link>
                <Nav.Link href="/my_visits">My Visits</Nav.Link>
              </>
            )}
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
                <a onClick={handleLogout} style={{ cursor: "pointer" }}>Log out</a>
              </Navbar.Text>
            </div>
          ) : (
            <Navbar.Text>
              <a href="/login">Login</a>
            </Navbar.Text>
          )}
        </Navbar.Collapse>{" "}
      </Container>
    </Navbar >
  );
}
