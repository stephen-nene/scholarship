import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import { Profiles } from "./pages/Profiles";
import ProtectedRoute from "./pages/utils/ProtectedRoute";

// Lazy load dashboard components
const Meetings = lazy(() => import("./pages/dashboard/Meetings"));
const Scholarships = lazy(() => import("./pages/dashboard/Scholarships"));
const Users = lazy(() => import("./pages/dashboard/Users"));
const HomeDash = lazy(() => import("./pages/dashboard/HomeDash"));

import { Login } from "./pages/auth/Login";
import Forgot from "./pages/auth/Forgot";
import Register from "./pages/auth/Register";
import Activate from "./pages/auth/Activate";
import Reset from "./pages/auth/Reset";

import Error404 from "./pages/utils/Error404";
import "./assets/styles/App.css";

import { getCurrentUser } from "./helpers/auth";

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  // console.log(userData);
  useEffect(() => {
    if (!userData) {
      getCurrentUser(dispatch);
    }
  }, []);

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
      <div className="flex flex-col gap- ">
        <Navbar darkMode={darkMode} />
        <div className="bg-sky-900   min-h-screen  pt-[63px] md:mt-[5px]   ">
          {/* <div className=""> */}
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
                <Suspense fallback={<div>Loading Dashboard...</div>}>
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Outlet />
                  </ProtectedRoute>
                </Suspense>
              }
            >
              <Route path="" element={<HomeDash />} />
              <Route path="users" element={<Users darkMode={darkMode} />} />
              <Route path="meetings" element={<Meetings darkMode={darkMode}/>} />
              <Route path="scholarships" element={<Scholarships />} />
            </Route>

            <Route path="/login" element={<Login darkMode={darkMode} />} />
            <Route path="/forgot" element={<Forgot darkMode={darkMode} />} />
            <Route
              path="/register"
              element={<Register darkMode={darkMode} />}
            />
            <Route
              path="/activate/:token"
              element={
                // <ProtectedRoute>
                  <Activate />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/reset/:token"
              element={<Reset darkMode={darkMode} />}
            />

            <Route path="*" element={<Error404 darkMode={darkMode} />} />
          </Routes>
        </div>
        {/* </div> */}
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}

export default App;
