import MyNavbar from "../components/navbar";
import UserProfileCard from "../components/UserProfileCard";
import { Col, Row } from "react-bootstrap";
import { CURRENT_USER } from "../apiurls";
import { useState, useEffect } from "react";
import landing_page_info from "../static/landing_page_info.js"
import api from "../api";

const LandingPage = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const [userData, setUserData] = useState({});

  // const fetchCurrentUser = async () => {
  //   try {
  //     const response = await api.get(CURRENT_USER, {
  //       headers: { Authorization: accessToken },
  //     });
  //     setUserData(response.data);
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error);
  //     window.location.href = "/login";
  //   }
  // }

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, []);

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
            <UserProfileCard key={index} title={element.title} description={element.description} />
          ))}
        </Col>
        <Col>
          {secondHalfInfo.map((element, index) => (
            <UserProfileCard key={index + splitIndex} title={element.title} description={element.description} />
          ))}
        </Col>
      </Row>
      <div className="greenBackground"></div>
    </div >
  )
}
export default LandingPage;
