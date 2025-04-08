import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages:
import Home from "./pages/Home";
import CreateSlam from "./pages/CreateSlam";
import Slambrary from "./pages/Slambrary";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SlamPage from "./pages/SlamPage";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import EditSlam from "./pages/EditSlam";
import SlamResponses from "./pages/SlamResponses";
import SlamResponsePage from "./pages/SlamResponsePage";

// Components:
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="z-30 fixed w-full top-0">
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createslam" element={<CreateSlam />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/slambrary" element={<Slambrary />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/slam/:id/showslam" element={<SlamResponsePage />} />
          <Route path="/slam/:id" element={<SlamPage />} />
          <Route path="/editslam/:id" element={<EditSlam />} />
          <Route path="/slamresponses/:id" element={<SlamResponses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
