import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { DashBoard } from "./pages/DashBoard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <Header />
      {/* */}
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      {/* } */}
      <ToastContainer
        style={{ width: "200px", height: "50px", margin: "auto" }}
      />
    </div>
  );
}

export default App;
