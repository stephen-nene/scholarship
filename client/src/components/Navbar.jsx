import React, { useState } from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../store/actions/appAction";
import "../assets/styles/navbar.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const darkMode = useSelector((state) => state.app.darkMode);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <div className="hidden md:flex items-center gap-4">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              <NavLink to="/services" className="nav-link">
                Services
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                Profile
              </NavLink>
              <Link to="/login" className="btn btn-login">
                Login
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
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
            <NavLink to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link" onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink to="/services" className="nav-link" onClick={toggleMenu}>
              Services
            </NavLink>
            <NavLink to="/contact" className="nav-link" onClick={toggleMenu}>
              Profile
            </NavLink>
            <Link
              to="/login"
              className="btn btn-login"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};
