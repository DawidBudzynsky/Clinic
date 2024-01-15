import Navbar from "../components/navbar";
import UserProfileCard from "../components/UserProfileCard";
import { Col, Row } from "react-bootstrap";
import { CURRENT_USER } from "../apiurls";
import { useState, useEffect } from "react";
import api from "../api";

const UserHomePage = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const [userData, setUserData] = useState({});

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get(CURRENT_USER, {
        headers: { Authorization: accessToken },
      });
      setUserData(response.data);
      console.log(response)
    } catch (error) {
      console.log(error);
      window.location.href = "/login";
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Row style={{ paddingLeft: '20%', paddingRight: '20%' }}>
        <Col>
          <UserProfileCard userData={userData} />
          <UserProfileCard userData={userData} />
        </Col>
        <Col>
          <UserProfileCard userData={userData} />
        </Col>
      </Row>
      <div className="greenBackground"></div>
    </div >
  )
}
export default UserHomePage;
