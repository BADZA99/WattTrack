import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Calcul from "./pages/Calcul";
import { ToastContainer } from "react-toastify";
import Historique from "./pages/Historique";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="w-full h-full ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calcul" element={<Calcul />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Router>
  );
}

export default App;
