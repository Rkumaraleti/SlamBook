import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages:
import Home from "./pages/Home";
import CreateSlam from "./pages/CreateSlam";
import Slambrary from "./pages/Slambrary";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SlamPage from "./pages/SlamPage";
import Page404 from "./pages/Page404";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";

// Context:
import { AuthProvider } from "./context/authContext";

// Components:
import Navbar from "./components/Navbar";

// Error Handling:
import ErrorBoundary from "./components/ErrorBoundary";
import EditSlam from "./pages/EditSlam";

function App() {
  return (
    <ErrorBoundary fallback={Error}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createslam" element={<CreateSlam />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/slambrary" element={<Slambrary />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/slam/:id" element={<SlamPage />} />
            <Route path="/editslam/:id" element={<EditSlam />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
