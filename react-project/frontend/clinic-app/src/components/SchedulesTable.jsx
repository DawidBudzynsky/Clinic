import DoctorInfoModal from "./DoctorInfoModal";
import { useState } from "react";

export default function SchedulesTable({ schedules }) {
  const [show, setShow] = useState(false);
  const [scheduleToShow, setScheduleToShow] = useState({});
  const handleClose = () => setShow(false);

  const handleShowSchedule = (scheduleData) => {
    setScheduleToShow(scheduleData);
    setShow(true);
  };

  return (
    <>
      {/* <DoctorInfoModal show={show} handleClose={handleClose} doctorInfo={scheduleToShow} /> */}
      <div className="px-3 py-3 shadow rounded-3 mb-5" style={{ minHeight: '60vh', backgroundColor: 'white' }}>
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
            {schedules.map((schedule, index) => (
              <tr key={schedule.id} onClick={() => handleShowSchedule(schedule)}>
                <th scope="row">{index + 1}</th>
                <td>{schedule.doctor.username}</td>
                <td>{schedule.day}</td>
                <td>{schedule.start}</td>
                <td>{schedule.finish}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
