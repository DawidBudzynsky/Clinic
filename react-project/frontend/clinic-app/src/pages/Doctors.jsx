import React, { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/navbar";
import Button from "react-bootstrap/Button";
import { DOCTORS_URL } from "../apiurls";
import DoctorsTable from "../components/DoctorsTable";
import DoctorInfoModal from "../components/DoctorInfoModal";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [show, setShow] = useState(false);
  // NOTE: not needed now, dont have add modal
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchDoctors = async () => {
    const response = await api.get(DOCTORS_URL);
    setDoctors(response.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, [show]);

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h1>Doctors</h1>
        <DoctorsTable doctors={doctors} />
        <Button variant="primary" onClick={handleShow}>
          Add Doctor
        </Button>
      </div>
    </div>
  );
};
export default Doctors;
