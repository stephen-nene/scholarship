import React, { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { serverLogin } from "../../helpers/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export const Login = ({ darkMode = false }) => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const onFinish = async (values) => {
    setLoading(true);
    setServerMessage("");
    setError("");
    try {
      // console.log("Login attempt:", values);
      await serverLogin(values, navigate, dispatch);
      setTimeout(()=>{},2000)
    } catch (error) {
      setError(error.response?.data?.error || "An unexpected error occurred.");
      // console.error("Error during login:", error.response);
    } finally {
      setLoading(false);
    }
  };

  const formStyles = darkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-300 text-gray-800";

  const textColor = darkMode ? "text-white" : "text-gray-800";
  const linkColor = darkMode
    ? "text-blue-400 hover:text-blue-300"
    : "text-blue-600 hover:text-blue-800";

  return (
    <div
      className={`min-h-screen  flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "b"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 space-y-6 rounded-xl border shadow-lg ${formStyles}`}
      >
        <Typography.Title level={2}>
          <p className={`text-center mb-2 ${textColor}`}>
            {!userData ? "Welcome Back" : `Hello ${userData.role} ${userData?.username}`}
          </p>
        </Typography.Title>

        {serverMessage && (
          <Alert
            message={serverMessage}
            type="success"
            showIcon
            className="mb-4"
            closable
          />
        )}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
            closable
            closeIcon
          />
        )}

        <Form
          name="login"
          initialValues={{ remember_me: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          {/* Username Field */}
          {/* <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              placeholder="Username"
              size="large"
              className={`${darkMode ? "bg-gray-700 border-gray-600 " : ""}`}
            />
          </Form.Item> */}
          {/* email field */}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="email"
              size="large"
              className={`${darkMode ? "bg-gray-700 border-gray-600 " : ""}`}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              className={`${
                darkMode ? "bg-gray-700 border-gray-600 " : "text-black"
              }`}
            />
          </Form.Item>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember_me" valuePropName="checked" noStyle>
              <Checkbox className={textColor}>Remember me</Checkbox>
            </Form.Item>
            <Link className={linkColor} to="/forgot">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        {/* Sign Up Prompt */}
        <div className="text-center">
          <Typography.Text
            className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Don't have an account?{" "}
            <Link to="/register" className={linkColor}>
              Sign up
            </Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
