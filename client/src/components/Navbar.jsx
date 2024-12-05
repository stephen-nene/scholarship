import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

import { FaBars, FaMoon, FaSun, FaUser } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

import { setDarkMode } from "../store/actions/appAction";
import "../assets/styles/navbar.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const darkMode = useSelector((state) => state.app.darkMode);
  const userData = useSelector((state) => state.user.userData);
  // console.log(userData);
  const dispatch = useDispatch();
  const location = useLocation();

  const isDashRoute = location.pathname.startsWith("/dash");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
    <div className={` ${darkMode ? "dark" : ""}`}>
      <header className="navbar">
        <nav className="container">
          <div className="navbar-wrapper">
            {/* Logo */}
            <NavLink className="text-2xl font-bold" to="/">
              Logo
            </NavLink>

            {/* Desktop Menu */}
            {!isDashRoute ? (
              <div className="hidden md:flex items-center gap-4">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/services" className="nav-link">
                  Scholarships
                </NavLink>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
                <Link to="/login" className="nav-link">
                  FAQs
                </Link>
                {!userData && (
                  <Link to="/login" className="btn btn-login">
                    Login
                  </Link>
                )}
                {userData && userData.role === "admin" && (
                  <Link to="/login" className="btn btn-login">
                    Dashboard
                  </Link>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                {userData?.role !== "admin" ? (
                  <Link to="/">unauthorized</Link>
                ) : (
                  <>
                    <NavLink to="/dash" className="nav-link">
                      DashHome
                    </NavLink>
                    <NavLink to="/services" className="nav-link">
                      Scholarships
                    </NavLink>
                    <NavLink to="/about" className="nav-link">
                      Users
                    </NavLink>
                    <Link to="/login" className="nav-link">
                      Meetings
                    </Link>
                  </>
                )}
                {!userData && (
                  <Link to="/" className="btn btn-login">
                    public
                  </Link>
                )}
              </div>
            )}

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {userData && (
                <Link to="/profile">
                  <FaUser className="icon text-gray-" size={24} />
                  {/* {userData.username} */}
                </Link>
              )}
              {darkMode ? (
                <FaSun
                  onClick={() => dispatch(setDarkMode(!darkMode))}
                  className="icon text-yellow-400"
                  size={24}
                />
              ) : (
                <FaMoon
                  onClick={() => dispatch(setDarkMode(!darkMode))}
                  className="icon text-gray-600"
                  size={24}
                />
              )}

              {/* Mobile Menu Toggle */}

              <div className="md:hidden cursor-pointer">
                {isMenuOpen ? (
                  <VscChromeClose onClick={toggleMenu} size={25} />
                ) : (
                  <FaBars onClick={toggleMenu} size={25} />
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mobile-menu">
            {isDashRoute ? (
              userData?.role !== "admin" ? (
                <Link to="/">unauthorized</Link>
              ) : (
                <>
                  <NavLink to="/dash" className="nav-link">
                    DashHome
                  </NavLink>
                  <NavLink to="/dash/scholarships" className="nav-link">
                    Scholarships
                  </NavLink>
                  <NavLink to="/dash/users" className="nav-link">
                    Users
                  </NavLink>
                  <Link to="/dash/meetings" className="nav-link">
                    Meetings
                  </Link>
                  {!userData && (
                    <Link to="/" className="btn btn-login">
                      public
                    </Link>
                  )}
                </>
              )
            ) : (
              <>
                <NavLink to="/" className="nav-link" onClick={toggleMenu}>
                  Home
                </NavLink>
                <NavLink to="/about" className="nav-link" onClick={toggleMenu}>
                  About
                </NavLink>
                <NavLink
                  to="/services"
                  className="nav-link"
                  onClick={toggleMenu}
                >
                  Services
                </NavLink>
                <NavLink
                  to="/profile"
                  className="nav-link"
                  onClick={toggleMenu}
                >
                  Profile
                </NavLink>
                <Link
                  to="/login"
                  className="btn btn-login"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
};
