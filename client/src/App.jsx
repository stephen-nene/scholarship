import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import Error404 from "./pages/utils/Error404";
import { Navbar } from "./components/Navbar";

import "./assets/styles/App.css";
import Forgot from "./pages/auth/Forgot";
import Register from "./pages/auth/Register";

import { useSelector } from "react-redux";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const darkMode = useSelector((state) => state.app.darkMode);

  const user = {
    first_name: "Judson",
    last_name: "Macejkovic",
    middle_name: "Nene",
    username: "marhta",
    phonenumber: "768.761.0038",
    email: "stevekid705@gmail.com",
    password: "assword",
    addresses: {
      street: "3565 Allyson Street",
      city: "South Adrianburgh",
      state: "Maryland",
      country: "Portugal",
    },
    profile_pic: "https://tinyurl.com/ytdspj2e",
  };

  return (
    <>
      <Navbar darkMode={darkMode}  />
      <div className="h-screen mt-[60px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/forgot-password" element={<Forgot darkMode={darkMode} />}/>
          <Route path="/register" element={<Register darkMode={darkMode}/>} />
          <Route path="*" element={<Error404 darkMode={darkMode} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
