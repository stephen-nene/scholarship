import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

import '../assets/styles/navbar.css';

export default function Footer() {
    const darkMode = useSelector((state) => state.app.darkMode);

    return (
        <footer className={`${!darkMode ? "bg-sky-100 " : "bg-gray-950 dark"} transition`}>
            <div className="container px-6 py-12 mx-auto">
                <div className="md:flex md:-mx-3 md:items-center md:justify-between">
                    <h1
                        className={`text-xl font-semibold tracking-tight ${
                            !darkMode ? "text-gray-800" : "text-white"
                        } md:mx-3 xl:text-2xl`}
                    >
                        Subscribe to our newsletter to get updates.
                    </h1>

                    <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
                        <Link
                            to="/signup"
                            className="cta-button"
                        >
                            <span>Sign Up Now</span>
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div>
                        <p className="section-title">Quick Links</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/about" className="footer-link">Who We Are</Link>
                            <Link to="/philosophy" className="footer-link">Our Philosophy</Link>
                        </div>
                    </div>

                    <div>
                        <p className="section-title">Industries</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <Link to="/retail" className="footer-link">Retail & E-Commerce</Link>
                            <Link to="/tech" className="footer-link">Information Technology</Link>
                            <Link to="/finance" className="footer-link">Finance & Insurance</Link>
                        </div>
                    </div>

                    <div>
                        <p className="section-title">Services</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <Link to="/translation" className="footer-link">Translation</Link>
                            <Link to="/proofreading" className="footer-link">Proofreading & Editing</Link>
                            <Link to="/content" className="footer-link">Content Creation</Link>
                        </div>
                    </div>

                    <div>
                        <p className="section-title">Contact Us</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="tel:+8807684734978" className="footer-link">+880 768 473 4978</a>
                            <a href="mailto:info@merakiui.com" className="footer-link">info@merakiui.com</a>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

                <div className="flex flex-col items-center justify-between sm:flex-row">
                    <Link to="/">
                        <img
                            className="w-auto h-7"
                            src="https://merakiui.com/images/full-logo.svg"
                            alt="Meraki UI Logo"
                        />
                    </Link>
                    <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
                        © Copyright 2021. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
