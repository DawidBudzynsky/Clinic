import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  Image,
  CardBody,
} from "react-bootstrap";

const UserProfileCard = ({ userData }) => {
  return (
    <>
      <Col className="mx-auto px-5">
        <Card className="mb-3 mt-5 rounded-4 shadow border-0">
          <Row className="g-0" style={{ height: 'vh100' }}>
            <Col
              className="d-flex flex-column align-items-center justify-content-center rounded-start-4 text-center text-black px-5 py-5"
            >
              <CardText className="h2">{userData.username}</CardText>
              <CardText className="h4 mb-3">
                {userData.first_name}
              </CardText>
              <CardText className="h4 mb-3">
                {userData.last_name}
              </CardText>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  )
}
export default UserProfileCard;
