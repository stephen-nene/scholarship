import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import { Profiles } from "./pages/Profiles";
import ProtectedRoute from "./pages/utils/ProtectedRoute";

import Meetings from "./pages/dashboard/Meetings";
import Scholarships from "./pages/dashboard/Scholarships";
import Users from "./pages/dashboard/Users";
import HomeDash from "./pages/dashboard/HomeDash";

import { Login } from "./pages/auth/Login";
import Forgot from "./pages/auth/Forgot";
import Register from "./pages/auth/Register";

import Error404 from "./pages/utils/Error404";
import "./assets/styles/App.css";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const darkMode = useSelector((state) => state.app.darkMode);
  const userData = useSelector((state) => state.user.userData);
  // console.log(userData);

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
      <Navbar darkMode={darkMode} />
      <div className="h-screen   ">
        <div className="min-h-screen  pt-[63px] md:mt-[10px] ">

        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profiles />
              </ProtectedRoute>
            }
          />

          <Route
            path="dash"
            element={
              <ProtectedRoute allowedRoles={["admin"]}><Outlet/></ProtectedRoute>
            }
          >
            <Route path="" element={<HomeDash />} />
            <Route path="users" element={<Users />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="scholarships" element={<Scholarships />} />
          </Route>

          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route
            path="/forgot-password"
            element={<Forgot darkMode={darkMode} />}
          />
          <Route path="/register" element={<Register darkMode={darkMode} />} />

          <Route path="*" element={<Error404 darkMode={darkMode} />} />
        </Routes>
        </div>
      <Footer darkMode={darkMode} />
      </div>
    </>
  );
}

export default App;
