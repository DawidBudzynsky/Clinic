import { Routes, Route } from "react-router-dom";
import Users from "./pages/users";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import 'react-toastify/dist/ReactToastify.css';
import Schedules from "./pages/Schedules";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div class="footer">
        <p>123 Medical Street, Cityville | Phone: (123) 456-7890 | Email: info@clinicmanagement.com</p>
        <p>&copy; 2024 Clinic Management System | All rights reserved</p>
      </div>
    </>
  );
}

export default App;
