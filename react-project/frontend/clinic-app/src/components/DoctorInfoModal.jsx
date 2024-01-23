import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { UPDATE_DOCTOR } from "../apiurls";
import api from "../api";

export default function DoctorInfoModal({ show, handleClose, doctorInfo, specialities, onApply }) {
  const sessionToken = sessionStorage.getItem("accessToken");
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    speciality: "",
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = () => {
    handleClose();
    setIsEditMode(false);
  };

  const handleSaveButton = () => {
    handleClose();
    handleSubmit();
    setIsEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const updateDoctorURL = UPDATE_DOCTOR + doctorInfo.id;
    await api
      .patch(updateDoctorURL, formData, {
        headers: {
          Authorization: sessionToken,
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
      email: doctorInfo.email,
      first_name: doctorInfo.first_name,
      last_name: doctorInfo.last_name,
      speciality: doctorInfo.speciality,
    })
  }, [show])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Doctor Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={doctorInfo.username}
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
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              disabled={!isEditMode}
              placeholder="Enter email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSpeciality">
            <Form.Label>Speciality</Form.Label>
            <Form.Select
              aria-label="Speciality"
              disabled={!isEditMode}
              name="speciality"
              value={formData.speciality}
              onChange={handleInputChange}
            >
              <option value="" disabled hidden>
                Select Speciality
              </option>
              {specialities.map((speciality, index) => (
                <option key={index} value={speciality}>
                  {speciality}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* NOTE: Not implemented yet */}
        {isEditMode ? (
          <Button className="applyButton" onClick={handleSaveButton}>
            Save
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleEditClick}>
            Edit
          </Button>
        )}
        <Button variant="secondary" onClick={handleCloseEdit}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
