import {
  Row,
  Col,
  Card,
  CardText,
} from "react-bootstrap";

const InfoCard = ({ title, description }) => {
  return (
    <>
      <Col className="mx-auto px-5">
        <Card className="mb-3 mt-5 rounded-4 shadow border-0">
          <Row className="g-0" style={{ height: 'vh100' }}>
            <div className="mx-auto d-flex justify-content-center">
            </div>
            <Col
              className="d-flex flex-column align-items-center justify-content-center rounded-start-4 text-black px-5 py-5"
            >
              <CardText className="h2">{title}</CardText>
              <CardText className="mb-3 ">{description}</CardText>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  )
}
export default InfoCard;
