import MyNavbar from "../components/navbar";
import InfoCard from "../components/InfoCard";
import { Col, Row } from "react-bootstrap";
import landing_page_info from "../static/landing_page_info.js"

const LandingPage = () => {
  const info = Object.values(landing_page_info);
  const splitIndex = Math.ceil(info.length / 2);
  const firstHalfInfo = info.slice(0, splitIndex);
  const secondHalfInfo = info.slice(splitIndex);
  return (
    <div className="overflow-hidden">
      <MyNavbar />
      <Row style={{ paddingLeft: '20%', paddingRight: '20%' }}>
        <Col>
          {firstHalfInfo.map((element, index) => (
            <InfoCard key={index} title={element.title} description={element.description} />
          ))}
        </Col>
        <Col>
          {secondHalfInfo.map((element, index) => (
            <InfoCard key={index + splitIndex} title={element.title} description={element.description} />
          ))}
        </Col>
      </Row>
      <div className="greenBackground"></div>
    </div >
  )
}
export default LandingPage;
