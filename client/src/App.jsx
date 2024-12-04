import React,{useState} from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import Error404 from "./pages/Error404";
import { Navbar } from "./components/Navbar";

import "./assets/styles/App.css";

function App() {
  const [darkMode,setDarkMode]= useState(false)
  console.log(darkMode)
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div className="h-screen mt-[60px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<Error404 darkMode={darkMode}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
