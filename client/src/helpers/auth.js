import axios from "axios";
import { message } from "antd";
import {loginAction,signupAction,logoutAction} from '../store/actions/userAction'
function showMessage(type, content, duration) {
  return message[type]({
    content,
    duration,
  });
}

const url = "http://localhost:3000/";
const user = {
  first_name: "Judson",
  last_name: "Macejkovic",
  middle_name: "Nene",
  username: "marhta",
  phonenumber: "768.761.0038",
  email: "stevekid705@gmail.com",
  password: "assword",
  role:"admin",
  status: "active",
  addresses: {
    street: "3565 Allyson Street",
    city: "South Adrianburgh",
    state: "Maryland",
    country: "Portugal",
  },
  profile_pic: "https://tinyurl.com/ytdspj2e",
};
export const serverLogin = async (values,navigate,dispatch) => {
  const loadingMessage = message.loading("Logging in...", 0); 

      dispatch(loginAction(user))
  try {
    const response = await axios.post(`${url}auth/login`, values);
    if (response.status === 200) {
      loadingMessage(); 
      showMessage("success",response?.data?.message, 2);
      // dispatch(loginAction(response.data.user))
      // navigate("/profiles")
      // console.log(response.data)
      return response.data; 
    } else {
      loadingMessage(); 
      showMessage("error", "Login Failed", 2);
      throw new Error("Login failed");
    }
  } catch (error) {
    loadingMessage();
    showMessage("error", error?.response?.data?.error, 3);
    // console.error(error.response.data);
    // throw error;
  } finally {
    loadingMessage(); 
  }
};
