import DoctorInfoModal from "./DoctorInfoModal";
import { useState } from "react";

export default function DoctorsTable({ doctors }) {
  const [show, setShow] = useState(false);
  const [doctorToShow, setDoctorToShow] = useState({});
  const handleClose = () => setShow(false);

  const handleShowDoctor = (doctorData) => {
    setDoctorToShow(doctorData);
    setShow(true);
  };

  return (
    <>
      <DoctorInfoModal show={show} handleClose={handleClose} doctorInfo={doctorToShow} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Speciality</th>
            <th scope="col">Username</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            {/* <th scope="col">Handle</th> */}
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
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
    </>
  );
}
