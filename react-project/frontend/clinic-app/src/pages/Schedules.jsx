import React, { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/navbar";
import { SCHEDULES_URL } from "../apiurls";
import SchedulesTable from "../components/SchedulesTable";
import AddScheduleModal from "../components/AddScheduleModal";
import { toast, ToastContainer } from "react-toastify";

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // NOTE: not needed now, dont have add modal
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const fetchSchedules = async () => {
    const response = await api.get(SCHEDULES_URL);
    setSchedules(response.data);
  };

  const onApply = (prev) => {
    setRefresh((prev) => !prev)
  }

  useEffect(() => {
    fetchSchedules();
  }, [show, refresh]);

  return (
    <div>
      <ToastContainer />
      <AddScheduleModal show={show} handleClose={handleClose} />
      <Navbar />
      <div className="container my-4 ">
        <h1>Scheduels</h1>
        <SchedulesTable schedules={schedules} onApply={onApply} />
        <button className="whiteButton" onClick={handleShow}>
          Add Schedule
        </button>
      </div>

      <div className="greenBackground"></div>
    </div>
  );
};
export default Schedules;
