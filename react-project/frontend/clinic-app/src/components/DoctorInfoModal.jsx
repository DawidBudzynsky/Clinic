
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function DoctorInfoModal({ show, handleClose, doctorInfo }) {

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
              readOnly
              value={doctorInfo.username}
            />

            <Form.Label>First</Form.Label>
            <Form.Control
              type="text"
              disabled
              readOnly
              value={doctorInfo.first_name}
            />

            <Form.Label>Last</Form.Label>
            <Form.Control
              type="text"
              disabled
              readOnly
              value={doctorInfo.last_name}
            />

            <Form.Label>Speciality</Form.Label>
            <Form.Control
              type="text"
              disabled
              readOnly
              value={doctorInfo.speciality}
            />

          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* NOTE: Not implemented yet */}
        <Button variant="secondary" >
          Edit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
