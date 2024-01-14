import DoctorInfoModal from "./DoctorInfoModal";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import api from "../api";
import { SPECIALITIES_URL } from "../apiurls";
import SearchBar from "./SearchBar";

export default function DoctorsTable({ doctors }) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [specialities, setSpecialities] = useState([])
  const [specialitySearch, setSpecialitySearch] = useState('');
  const [doctorToShow, setDoctorToShow] = useState({});
  const handleClose = () => setShow(false);

  const handleShowDoctor = (doctorData) => {
    setDoctorToShow(doctorData);
    setShow(true);
  };
  const preventSubmiting = (e) => {
    e.preventDefault();
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

  useEffect(() => {
    fetchSpecialities();
  }, []);

  return (
    <>
      <DoctorInfoModal show={show} handleClose={handleClose} doctorInfo={doctorToShow} />
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

              return ((searchTerm === '' ? item : item.first_name.toLowerCase().includes(searchTerm) || item.username.toLowerCase().includes(searchTerm)) &&
                (specialitySearch === '' ? item : item.speciality.includes(specialitySearch)));
            }).map((doctor, index) => (
              <tr key={doctor.id} onClick={() => handleShowDoctor(doctor)}>
                <th scope="row">{index + 1}</th>
                <td>{doctor.speciality}</td>
                <td>{doctor.username}</td>
                <td>{doctor.first_name}</td>
                <td>{doctor.last_name}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
