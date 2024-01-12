import { Routes, Route } from "react-router-dom";
import Users from "./pages/users";
import Doctors from "./pages/Doctors";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/doctors" element={<Doctors />} />
    </Routes>
  );
}

export default App;
