import React, { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/navbar";
import Button from "react-bootstrap/Button";
import { DOCTORS_URL } from "../apiurls";
import DoctorsTable from "../components/DoctorsTable";
import AddDoctorModal from "../components/DoctorAddModal";
import { ToastContainer } from "react-toastify";

const Reports = () => {
  const [doctors, setDoctors] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const fetchDoctors = async () => {
    const response = await api.get(DOCTORS_URL);
    setDoctors(response.data);
  };

  const onApply = () => {
    setRefresh((prev) => !prev)
  }

  useEffect(() => {
    fetchDoctors();
  }, [show, refresh]);

  return (
    <div>
      <AddDoctorModal show={show} handleClose={handleClose} />
      <ToastContainer />
      <Navbar />
      <div className="container my-4 ">
        <h1>Doctors</h1>
        <DoctorsTable doctors={doctors} onApply={onApply} reports={true} />
        <button className="whiteButton" variant="primary" onClick={handleShow}>
          Add Doctor
        </button>
      </div>

      <div className="greenBackground"></div>
    </div>
  );
};
export default Reports;
