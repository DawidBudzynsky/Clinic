import { Routes, Route } from "react-router-dom";
import Users from "./pages/users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
    </Routes>
  );
}

export default App;
