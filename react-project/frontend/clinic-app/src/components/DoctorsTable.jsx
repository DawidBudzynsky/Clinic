import DoctorInfoModal from "./DoctorInfoModal";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../api";
import { DELETE_DOCTOR, SPECIALITIES_URL } from "../apiurls";
import SearchBar from "./SearchBar";

export default function DoctorsTable({ doctors, onApply }) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [specialities, setSpecialities] = useState([])
  const [specialitySearch, setSpecialitySearch] = useState('');
  const [doctorToShow, setDoctorToShow] = useState({});
  const handleClose = () => setShow(false);

  const fieldsToSearch = ["username", "first_name", "last_name"]

  const handleShowDoctor = (e, doctorData) => {
    if (e.target.tagName.toLowerCase() === "button") {
      e.stopPropagation();
      return;
    }
    setDoctorToShow(doctorData);
    setShow(true);
    setShow(true);
  };

  const fetchSpecialities = async () => {
    try {
      const response = await api.get(SPECIALITIES_URL);
      setSpecialities(response.data);
      console.log(specialities)
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  const handleDeleteDoctor = (doctor) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this doctor?",
    );
    if (confirmation) {
      try {
        api.delete(`${DELETE_DOCTOR}` + doctor.id);
        toast.success("Doctor deleted successfully");
        onApply();
      } catch (error) {
        console.error(error);
        toast.error("Error deleting doctor");
        onApply();
      }
    }
  };

  useEffect(() => {
    fetchSpecialities();
  }, []);

  return (
    <>
      <DoctorInfoModal show={show} handleClose={handleClose} doctorInfo={doctorToShow} specialities={specialities} onApply={onApply} />
      <div className="px-3 py-3 shadow rounded-3 mb-5" style={{ minHeight: '60vh', backgroundColor: 'white' }}>
        <div className="d-flex mb-3 justify-content-between">
          <SearchBar setSearch={(e) => setSearch(e.target.value)} haveSelect={true} selectValues={specialities} setSelectSearch={(e) => setSpecialitySearch(e.target.value)} />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Speciality</th>
              <th scope="col">Username</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
            </tr>
          </thead>
          <tbody>
            {doctors.filter((item) => {
              const searchTerm = search.toLowerCase();

              return ((searchTerm === '' ? item : fieldsToSearch.some(field => item[field].toLowerCase().includes(searchTerm))) &&
                (specialitySearch === '' ? item : item.speciality.includes(specialitySearch)));
            }).map((doctor, index) => (
              <tr key={doctor.id} onClick={(e) => handleShowDoctor(e, doctor)}>
                <th scope="row">{index + 1}</th>
                <td>{doctor.speciality}</td>
                <td>{doctor.username}</td>
                <td>{doctor.first_name}</td>
                <td>{doctor.last_name}</td>
                <td>
                  {/* NOTE: for now button not working */}
                  <Button
                    className="primary btn-danger"
                    onClick={() => handleDeleteDoctor(doctor)}
                  >
                    Delete
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
