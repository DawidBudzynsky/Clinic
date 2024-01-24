import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../api";
import React, { useState } from "react";
import { HOME, USERS_URL } from "../apiurls";
import { ToastContainer, toast } from 'react-toastify';

export default function RegisterModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    is_admin: false,
    is_active: false,
  });

  const notifySuccess = () => toast.success("Registered succesfuly! Now LOG IN!");
  const notifyError = () => toast.error("Something went wrong");
  const goToHome = () => {
    window.location.href = "/login";
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(USERS_URL, formData);
      handleClose();
      console.log(response);
      notifySuccess();
      setTimeout(goToHome, 2000);

    } catch (error) {
      console.error(error);
      notifyError();
    }
  };

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
    console.log(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleInputChange}
              value={formData.first_name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleInputChange}
              value={formData.last_name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="loginButton mx-auto" variant="primary" onClick={handleSubmit}>
          Submit
        </button>
        <ToastContainer />
      </Modal.Footer>
    </Modal >
  );
}
