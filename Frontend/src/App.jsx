import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateSlam from "./pages/CreateSlam";
import Slambrary from "./pages/Slambrary";
import Login from "./pages/Login";
import SlamPage from "./pages/SlamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createslam" element={<CreateSlam />} />
        <Route path="/slambrary" element={<Slambrary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slam/:id" element={<SlamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
