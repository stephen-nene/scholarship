import { message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { reactivateAccount } from "./ServerCom";

export default function NotActivate({ user, darkMode }) {
  const [error, setError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState("");
  const handleReactivate = (e) => {
    e.preventDefault();

    if (!user) {
        message.warning("You have to be logged to perform this action",4);
        return;
    }
    message.success("resending email to " + user.email)
    // reactivateAccount(user.user.email, setError, setServerMessage, setLoading);

  };
  return (
    <div className={`p-4 ${darkMode? 'bg-slate-900':"bg"} flex flex-col items-center justify-center h-screen transition`}>
      <h1
        className={`text-5xl ${
          !darkMode ? " text-gray-900" : " text-gray-200"
        } font-bold mb-4`}
      >
        Account not activated
      </h1>

      {serverMessage ? (
        <>
          <p className="text-xl text-green-500 mb-2">{serverMessage}</p>
          <p className="text-xl text-green-500 mb-8">please check your inbox</p>
        </>
      ) : (
        <>
          <p className="text-xl text-gray-600 mb-3">
            An email was sent to your inbox with instructions on how activate your account.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            To resend the email click{" "}
            <span
              onClick={(e) => handleReactivate(e)}
              className={`text-blue-500 cursor-pointer ${
                darkMode ? "dark:text-blue-400" : ""
              }`}
            >
              here
            </span>
            .
          </p>
        </>
      )}
      {/* <p className="text-lg text-gray-600 mb-8">You have 5 days to activate it else your account will be revoked .</p> */}

      {/* <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Go to Login</Link> */}
    </div>
  );
}
