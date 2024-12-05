import axios from "axios";
import { message } from "antd";

function showMessage(type, content, duration) {
  return message[type]({
    content,
    duration,
  });
}

const url = "http://localhost:3000/";

export const serverLogin = async (values) => {
  const loadingMessage = message.loading("Logging in...", 0); // Show loading message without auto-hide

  try {
    // Make an actual API request here
    const response = await axios.post(`${url}auth/login`, values);
    if (response.status === 200) {
      loadingMessage(); // Hide the loading message
      showMessage("success", "Login Successful", 2);
      return response.data; // You can return the response data if needed
    } else {
      loadingMessage(); // Hide the loading message
      showMessage("error", "Login Failed", 2);
      throw new Error("Login failed");
    }
  } catch (error) {
    loadingMessage(); // Hide the loading message
    showMessage("error", error?.response?.data?.error, 3);
    // console.error(error.response.data);
    // throw error; // Rethrow to handle it in the calling function
  } finally {
    loadingMessage(); 
  }
};
