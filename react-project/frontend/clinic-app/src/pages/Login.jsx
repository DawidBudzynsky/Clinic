import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import RegisterModal from '../components/RegisterModal';
import { ToastContainer, toast } from 'react-toastify';
import RegisterCard from '../components/regsiterCard';
import api from "../api";
import { HOME, AUTHENTICATE, CURRENT_USER } from '../apiurls';


function Login() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const notifySuccess = () => toast.success("Logged in succesfuly! 👌");
  const notifyError = () => toast.error("Something went wrong 😫");
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const notify = () => toast.success("Logged in!");

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const goToHome = () => {
    window.location.href = "/";
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    try {
      const requestData = `username=${formData.username}&password=${formData.password}`;
      await api.post(AUTHENTICATE, requestData).then((response) => {
        console.log(response.data);
        const accessToken = `${response.data.token_type} ${response.data.access_token}`;
        sessionStorage.setItem("accessToken", accessToken);
        handleUserData(accessToken);
        notifySuccess();
        setTimeout(goToHome, 2000);
      });
    } catch (error) {
      notifyError();
      console.error(error.response.data);
    }
  };

  const handleUserData = async (accessToken) => {
    await api
      .get(CURRENT_USER, {
        headers: { Authorization: accessToken },
      })
      .then((response) => {
        setUserData(response.data);
        sessionStorage.setItem("userGroup", response.data.groupe);
      })
      .catch((error) => {
        window.location.href = "/login";
        console.log(error);
      });
  };

  const gradientStyle = {
    background: 'linear-gradient(to bottom right, #3ded97, #028A0F)',
    height: '100vh', // Set the height to fill the viewport
  };

  return (
    <>
      <RegisterModal show={show} handleClose={handleClose} />
      <Container className="shadow mt-5 rounded-2 ">
        <Row className="justify-content-between" style={{ minHeight: '60vh' }}>
          <Col className='px-5 text-center py-5 col-4 mx-auto my-auto'>
            <div className=''>
              <div className="d-flex align-items-center justify-content-center pb-4">
                <h3 className="card-title" style={{ fontSize: '4em', whiteSpace: 'nowrap' }}>Login to your Account</h3>
              </div>
              <hr className="border-gray" />
              <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInputChange}
                    value={formData.username}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    value={formData.password}
                    required
                  />
                </Form.Group>
                <div className="text-center mb-3">
                  <button
                    className='loginButton'
                    variant="secondary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  <ToastContainer />
                </div>
              </Form>
            </div>
          </Col>
          <RegisterCard handleOpen={handleOpen} />
        </Row>
      </Container>
    </>
  );
}

export default Login;
