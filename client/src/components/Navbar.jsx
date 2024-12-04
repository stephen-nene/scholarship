import React, { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

import "../assets/styles/navbar.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white fixed top-0 w-full shadow-md z-10">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <NavLink className="text-2xl font-bold text-gray-800" to="/">
              Logo
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
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
                Contact
              </NavLink>
              <a href="#" className="btn btn-signup">
                Sign Up
              </a>
              <a href="#" className="btn btn-login">
                Login
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-gray-800 focus:outline-none"
                onClick={toggleMenu} // Toggle the menu on click
              >
                <FcMenu size={30} />
              </button>
            </div>
          </div>
        </nav>
        {/* Mobile Menu (Conditionally rendered) */}
        {isMenuOpen && (
          <div className="mobile-menu">
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
              Contact
            </NavLink>
            <a href="#" className="btn btn-signup" onClick={toggleMenu}>
              Sign Up
            </a>
            <a href="#" className="btn btn-login" onClick={toggleMenu}>
              Login
            </a>
          </div>
        )}
      </header>
    </>
  );
};
