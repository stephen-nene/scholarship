import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = ({ darkMode = !true }) => {
  const navigate = useNavigate();

  const darkModeStyles = {
    background: "bg-black bg-opacity-50",
    container: "bg-gray-800 text-white border-blue-600",
    heading: "text-blue-500",
    text: "text-gray-300",
    subText: "text-gray-600",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  const lightModeStyles = {
    background: "bg-gray-100",
    container: "bg-white text-gray-800 border-blue-300",
    heading: "text-blue-600",
    text: "text-gray-800",
    subText: "text-gray-500",
    button: "bg-blue-500 hover:bg-blue-600 text-white",
  };

  const styles = darkMode ? darkModeStyles : lightModeStyles;

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${styles.background}`}>
      <div className={`p-10 rounded-2xl text-center max-w-lg w-full border-2 ${styles.container}`}>
        <div className="mb-6">
          <h1 className={`text-6xl font-bold ${styles.heading} mb-4`}>404</h1>
          <p className={`${styles.text}`}>
            The page you seek has vanished into the digital abyss.
          </p>
          <p className={`${styles.subText} my-4`}>
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className={`px-8 py-3 rounded-full ${styles.button} transition`}
        >
          Beam Me Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
