import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function UserInfoModal({ show, handleClose, userInfo }) {

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
              readOnly
              value={userInfo.username}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First</Form.Label>
            <Form.Control
              type="text"
              disabled
              readOnly
              value={userInfo.first_name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last</Form.Label>
            <Form.Control
              type="text"
              disabled
              readOnly
              value={userInfo.last_name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              disabled
              readOnly
              value={userInfo.email}
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
    </Modal >
  );
}
