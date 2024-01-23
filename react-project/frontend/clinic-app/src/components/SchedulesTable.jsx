import DoctorInfoModal from "./DoctorInfoModal";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import api from "../api";
import { DOCTORS_URL, DELETE_SCHEDULE } from "../apiurls";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SchedulesTable({ schedules, onApply }) {
  const [show, setShow] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [scheduleToShow, setScheduleToShow] = useState({});
  const [search, setSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const handleClose = () => setShow(false);
  const fieldsToSearch = ["day", "doctor.username"]

  const handleShowSchedule = (scheduleData) => {
    setScheduleToShow(scheduleData);
    setShow(true);
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get(DOCTORS_URL);
      setDoctors(response.data);
    } catch (error) {
      console.error(error)
    }
  };

  const handleDeleteSchedule = (schedule) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this schedule? It will delete all its doctors visits.",
    );
    if (confirmation) {
      try {
        api.delete(`${DELETE_SCHEDULE}` + schedule.id);
        toast.success("Schedule deleted successfully");
        onApply();
      } catch (error) {
        console.error(error);
        toast.error("Error deleting schedule");
        onApply();
      }
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <div className="px-3 shadow rounded-3 mb-5" style={{ minHeight: '60vh', maxHeight: '60vh', backgroundColor: 'white', overflowY: 'auto' }}>
        <div className="d-flex mb-3 mt-3 justify-content-between" style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1000 }}>
          <SearchBar haveSearch={false}
            haveSelect={true} selectValues={doctors.map(doctor => doctor.username)} setSelectSearch={(e) => setDoctorSearch(e.target.value)}
            haveDate={true} setDateSearch={(e) => setDateSearch(e.nativeEvent.target.value)} />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Doctor</th>
              <th scope="col">Day</th>
              <th scope="col">Starting</th>
              <th scope="col">Finishing</th>
            </tr>
          </thead>
          <tbody>
            {schedules.filter((item) => {
              const searchTerm = search.toLowerCase();
              return (doctorSearch === '' ? item : item.doctor.username.includes(doctorSearch)
              ) && (dateSearch === '' ? item : item.day.includes(dateSearch));
            }).map((schedule, index) => (
              <tr key={schedule.id} onClick={() => handleShowSchedule(schedule)}>
                <th scope="row">{index + 1}</th>
                <td>{schedule.doctor.username}</td>
                <td>{schedule.day}</td>
                <td>{schedule.start}</td>
                <td>{schedule.finish}</td>
                <td>
                  <Button
                    className="primary btn-danger"
                    onClick={() => handleDeleteSchedule(schedule)}
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
