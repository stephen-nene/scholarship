import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Home } from "./components/pages/Home";
import { Profiles } from "./components/pages/Profiles";
import HomeScholarships from "./components/pages/Scholarships";
import ProtectedRoute from "./components/utils/ProtectedRoute";

// Lazy load dashboard components
const Meetings = lazy(() => import("./components/pages/dashboard/Meetings"));
const Scholarships = lazy(() => import("./components/pages/dashboard/Scholarships"));
const Users = lazy(() => import("./components/pages/dashboard/Users"));
const HomeDash = lazy(() => import("./components/pages/dashboard/HomeDash"));
const Meeting = lazy(() => import("./components/pages/dashboard/Items/Meeting"));

import { Login } from "./components/pages/auth/Login";
import Forgot from "./components/pages/auth/Forgot";
import Register from "./components/pages/auth/Register";
import Activate from "./components/pages/auth/Activate";
import Reset from "./components/pages/auth/Reset";

import Error404 from "./components/utils/Error404";
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

  return (
    <>
      <div className="flex flex-col gap- ">
        <Navbar darkMode={darkMode} />
        <div
          className={`min-h-screen pt-55  ] md:pt-[7px] sm: ${
            darkMode ? "bg-black text-white" : "bg-gray-50"
          }  `}
        >
          {/* <div className=""> */}
          <Routes>
            <Route index element={<Home darkMode={darkMode} />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profiles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scholarships"
              element={<HomeScholarships/>}/>

            {/* dashboard routes  */}
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
              <Route
                path="meetings"
                element={<Meetings darkMode={darkMode} />}
              />
              <Route path="scholarships" element={<Scholarships />} />

              <Route path="meeting/:id" element={<Meeting />} />
            </Route>
            {/* authentication routes  */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot darkMode={darkMode} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/activate/:token" element={<Activate />} />
            <Route path="/reset/:token" element={<Reset />} />

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
