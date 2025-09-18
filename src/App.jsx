import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Calcul from "./pages/Calcul";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="w-full h-full ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calcul" element={<Calcul />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Router>
  );
}

export default App;
