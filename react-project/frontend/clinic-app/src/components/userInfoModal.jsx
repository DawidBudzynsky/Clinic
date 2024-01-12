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

            <Form.Label>First</Form.Label>
            <Form.Control
              type="text"
              disabled
              readOnly
              value={userInfo.username}
            />

            <Form.Label>Last</Form.Label>
            <Form.Control
              type="text"
              disabled
              readOnly
              value={userInfo.username}
            />

          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={handleSubmit}> */}
        {/*   Submit */}
        {/* </Button> */}
      </Modal.Footer>
    </Modal>
  );
}
