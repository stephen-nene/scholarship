import { Route, Navigate, Routes } from "react-router-dom";
import Unauthorised from "./utils/Unauthorised.jsx/index.js";
import NotLoggedIn from "./NotLoggedIn.jsx";
import NotActivate from "./NotActivate.jsx";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const userData = useSelector((state) => state.user.userData);
  const darkMode = useSelector((state) => state.app.darkMode);
  // console.log(userData)
  if (!userData || !Object.keys(userData).length) {
    return <NotLoggedIn darkMode={darkMode} />;
  }

  if(userData.user.status === 'pending'){
    return <NotActivate user={userData} darkMode={darkMode}/>
  }

  if (!allowedRoles.includes(userData.user.role)) {
    return <Unauthorised darkMode={darkMode} />;
  }
  // User is authenticated and has the correct role, render the component

  return element;
};

export default ProtectedRoute;
