import { Routes, Route } from "react-router-dom";
import Users from "./pages/users";
import Doctors from "./pages/Doctors";
import Register from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
