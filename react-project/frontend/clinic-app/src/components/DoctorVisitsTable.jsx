import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Button } from "react-bootstrap";
import api from "../api";
import { CURRENT_USER, SPECIALITIES_URL, VISITS } from "../apiurls";
import { Form } from "react-bootstrap";
import DescriptionModal from "./DescriptionModal";

export default function DoctorVisitsTable({ visits, onApply }) {
  const [show, setShow] = useState(false);
  const [specialities, setSpecialities] = useState([])
  const [chosenVisit, setChosenVisit] = useState({});
  const accessToken = sessionStorage.getItem("accessToken")
  const [currentUser, setCurrentUser] = useState({});

  const hideModal = () => {
    setShow(false);
  }
  const showModal = () => setShow(true);

  const handleAddDescriptionButton = (visit) => {
    showModal();
    setChosenVisit(visit);
    console.log(visit);
  }

  const handleApplyToVisit = async () => {
    try {
      // const response = await api.put(VISITS + "/" + requestData.visit_id, requestData, { params: { "user_id": requestData.user_id } });
      // console.log(response)
      // onApply();
    } catch (error) {
      console.error("Error updating visit:", error);
    }
  }

  const getCurrentUser = async () => {
    const response = await api.get(CURRENT_USER, {
      headers: { Authorization: accessToken }
    });
    setCurrentUser(response.data);
  }

  useEffect(() => {
    handleApplyToVisit();
  }, []) //NOTE: tehre was refreshment on requestData

  useEffect(() => {
    // fetchSpecialities();
    getCurrentUser();
  }, []);

  return (
    <>
      <DescriptionModal visit={chosenVisit} show={show} handleClose={hideModal} onApply={onApply} />
      <div className="px-3 py-3 shadow rounded-3 mb-5" style={{ minHeight: '60vh', backgroundColor: 'white' }}>
        <div className="d-flex mb-3 justify-content-between">
          <SearchBar haveSearch={false} haveDate={true} />
        </div>
        <table className="table table-striped" >
          <thead>
            <tr >
              <th scope="col">#</th>
              <th scope="col">Doctor</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th className="d-flex justify-content-center" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* NOTE: changeis reservd , remove exlamation */}
            {visits.filter((item) => !item.is_reserved && item.doctor.username == currentUser.username
            ).map((visit, index) => (
              <tr key={visit.id} >
                <th scope="row">{index + 1}</th>
                <td>{visit.doctor.username}</td>
                <td>{visit.visit_date}</td>
                <td>{visit.description}</td>
                <td className="d-flex justify-content-center">
                  <Button className="primary" onClick={() => handleAddDescriptionButton(visit)} >
                    ADD DESCRIPTION
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
