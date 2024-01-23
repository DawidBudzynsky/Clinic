import React, { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/navbar";
import AddUserModal from "../components/userFormModal";
import ErrorPage from "./ErrorPage";
import { VISITS } from "../apiurls";
import { toast, ToastContainer } from "react-toastify";
import VisitsTable from "../components/VisitsTable";
import CurrentUserVisitsTable from "../components/CurrentUserVisitsTable";

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toastError = (text) => toast.error(text);
  const group = sessionStorage.getItem("userGroup");

  const onApply = () => {
    setRefresh((prev) => !prev)
  }

  const fetchVisits = async () => {
    try {
      const response = await api.get(VISITS);
      // setAuthorized(true);
      setVisits(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
      // setAuthorized(false); //NOTE: dont know if i need it
      toastError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchVisits();
  }, [refresh]);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="container my-4">
        <h1>Visits</h1>
        {group === 'Doctor' ? (
          <CurrentUserVisitsTable visits={visits} onApply={onApply} />
        ) : (
          <>
            <VisitsTable visits={visits} onApply={onApply} />
          </>
        )}
      </div>
      <div className="greenBackground"></div>
    </div>
  );
};
export default Visits;
