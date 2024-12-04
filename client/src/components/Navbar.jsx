import React, { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Button, Flex } from "antd";
import { VscChromeClose } from "react-icons/vsc";

import "../assets/styles/navbar.css";

export const Navbar = ({ darkMode,setDarkMode }) => {
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

              <a href="#" className="btn btn-login">
                Login
              </a>
            </div>
            <div className="flex gap-4">
              <Flex className="items-center" gap="small">
                {darkMode ? (
                  <FaSun onClick={()=>setDarkMode(!darkMode)}  className="hover:text-yellow-600" size={24} />
                ) : (
                  <FaMoon onClick={()=>setDarkMode(!darkMode)} className="hover:text-blue-900" size={24} />
                )}
              </Flex>
              <div className="md:hidden cursor-pointer">
                {isMenuOpen ? (
                  <VscChromeClose onClick={toggleMenu} size={25} />
                ) : (
                  <FaBars onClick={toggleMenu} size={25} />
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
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
