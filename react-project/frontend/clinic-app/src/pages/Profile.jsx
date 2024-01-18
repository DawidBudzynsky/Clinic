import api from "../api";
import { useState, useEffect } from "react";
import { CURRENT_USER } from "../apiurls";
import MyNavbar from "../components/navbar";
import ProfileCard from "../components/ProfileCard";

export default function Profile() {
  const [userData, setUserData] = useState({});

  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    api.get(CURRENT_USER, {
      headers: { Authorization: accessToken },
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        window.location.href = "/login";
        console.log(error);
      });
  }, []);
  console.log(userData)
  return (
    <div>
      <MyNavbar />
      <ProfileCard userData={userData} />
      <div className="greenBackground"></div>
    </div >

  )
}
