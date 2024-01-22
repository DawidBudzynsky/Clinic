import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { UPDATE_USERS } from "../apiurls";
import api from "../api";

export default function UserInfoModal({ show, handleClose, userInfo, onApply }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken")
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    handleClose();
    handleSubmit();
    setIsEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async () => {
    const updateUserUrl = UPDATE_USERS + userInfo.id;
    await api
      .patch(updateUserUrl, formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        onApply();
        toast.success("Updated the user successfuly");
        console.log(response);
      })
      .catch((error) => {
        toast.error("Something went wrong with the update");
        console.log(error);
      });
  };

  useEffect(() => {
    setFormData({
      email: userInfo.email,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
    });
  }, [userInfo, show]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={userInfo.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              disabled={!isEditMode}
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              disabled={!isEditMode}
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              disabled={!isEditMode}
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* NOTE: Not implemented yet */}

        {isEditMode ? (
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleEditClick}>
            Edit
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal >
  );
}
