import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverLogout } from "../helpers/auth";

export const Profiles = () => {
  const user = useSelector((state) => state.user.userData);
  const darkMode = useSelector((state) => state.app.darkMode);
  const [edit, setEdit] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Checking if the user data is available
  if (!user) {
    return <div>Loading...</div>;
  }

  const {
    first_name,
    middle_name,
    last_name,
    username,
    email,
    phonenumber,
    addresses,
    profile_pic,
    role,
  } = user;

  const { street = "", city = "", state = "", country = "" } =
  (addresses && addresses[0]) || {};

  // Dark mode classes
  const bgColor = darkMode ? "bg-gray-900" : "bg-blue-500";
  const containerBg = darkMode ? "bg-gray-800" : "bg-white";
  const textColor = darkMode ? "text-gray-200" : "text-gray-600";
  const inputBg = darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700";
  const headerBg = darkMode ? "bg-gray-700" : "bg-gray-100";
  const buttonBg = darkMode ? "bg-purple-500 hover:bg-purple-600" : "bg-pink-500 hover:bg-pink-600";

  return (
    <div className={`min-h-screen ${bgColor} py-6`}>
      <section className="container mx-auto px-4">
        <div className={`${containerBg} shadow-lg rounded-lg overflow-hidden`}>
          <div className={`${headerBg} px-6 py-4 flex justify-between items-center`}>
            <h1 className={`text-xl font-bold ${darkMode ? "text-purple-300" : "text-blue-700"}`}>My Account</h1>
            <button
              className={`${buttonBg} text-white font-bold uppercase text-xs px-4 py-2 rounded shadow focus:outline-none transition-all`}
              onClick={() => setEdit(!edit)}
            >
              {edit ? "View" : "Edit"}
            </button>
          </div>
          <div className="p-6">
            <h2 className={`${textColor} text-sm font-bold uppercase mb-4`}>User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "First Name", value: first_name },
                { label: "Middle Name", value: middle_name },
                { label: "Last Name", value: last_name },
                { label: "Username", value: username },
                { label: "Email", value: email },
                { label: "Phone Number", value: phonenumber },
                { label: "Role", value: role },
              ].map((field, index) => (
                <div key={index}>
                  <label className={`block text-xs font-bold uppercase mb-2 ${textColor}`}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    className={`border rounded px-3 py-2 w-full text-sm focus:ring focus:outline-none ${inputBg}`}
                    value={field.value || ""}
                    readOnly={!edit}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h2 className={`${textColor} text-sm font-bold uppercase mb-4`}>Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Street", value: street },
                  { label: "City", value: city },
                  { label: "State", value: state },
                  { label: "Country", value: country },
                ].map((field, index) => (
                  <div key={index}>
                    <label className={`block text-xs font-bold uppercase mb-2 ${textColor}`}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      className={`border rounded px-3 py-2 w-full text-sm focus:ring focus:outline-none ${inputBg}`}
                      value={field.value || ""}
                      readOnly={!edit}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className={`block text-xs font-bold uppercase mb-2 ${textColor}`}>
                Profile Picture
              </label>
              <img
                src={profile_pic || "https://via.placeholder.com/150"}
                alt="Profile Pic"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>

            <div className="mt-6 text-center">
              <button
                className={`bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:bg-red-600 focus:outline-none transition-all`}
                type="button"
                onClick={()=>serverLogout(dispatch,navigate)}
              >
                Logout
              </button>
              {edit && (
                <button
                  className={`ml-4 bg-green-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none transition-all`}
                  type="submit"
                >Update Changes</button>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
