import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import RegisterModal from '../components/RegisterModal';
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const notify = () => toast.success("Logged in!");


  const handleLogin = () => {
    // Perform login logic here
    notify();

    console.log('Logging in with:', username, password);
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
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="text-center mb-3">
                  <button
                    className='loginButton'
                    variant="secondary"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <ToastContainer />
                </div>
              </Form>
            </div>
          </Col>

          <Col className='text-center col-4 p-0'>
            <div className='bg-success h-100 rounded-end d-flex flex-column align-items-center justify-content-center px-5' style={gradientStyle}>
              <h3 style={{ fontSize: '3em', whiteSpace: 'nowrap', color: 'white' }}>New Here?</h3>
              <p style={{ color: 'white' }}>Are you ready to revolutionize your clinic?</p>
              <p style={{ color: 'white' }}>Sign up now and elevate your practice by harnessing the power of top-tier software solutions.</p>
              <div className="text-center mb-3">
                <button
                  className='registerButton bg-white text-black'
                  variant="secondary"
                  type="button"
                  onClick={handleOpen}
                >
                  Sign up
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

