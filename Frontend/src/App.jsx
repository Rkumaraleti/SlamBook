import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages:
import Home from "./pages/Home";
import CreateSlam from "./pages/CreateSlam";
import Slambrary from "./pages/Slambrary";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SlamPage from "./pages/SlamPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createslam" element={<CreateSlam />} />
        <Route path="/slambrary" element={<Slambrary />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slam/:id" element={<SlamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
