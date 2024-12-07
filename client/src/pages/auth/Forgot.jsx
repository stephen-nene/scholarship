import React, { useState } from "react";
import { Button, Form, Input, Typography, Alert } from "antd";
import { Link } from "react-router-dom";
import { serverForgotPass } from "../../helpers/auth";

export const Forgot = ({ darkMode = false }) => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    setServerMessage("");
    setError("");
    try {
      // Call the server to send the reset link
      const response = await serverForgotPass(values.email);
      console.log("Password reset request:", response);
      setServerMessage(response?.message || "Password reset link sent!");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Failed to send password reset email.";
      setError(errorMessage);
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
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 space-y-6 rounded-xl border shadow-lg ${formStyles}`}
      >
        <Typography.Title level={2} className={`text-center mb-6 ${textColor}`}>
          Forgot Password
        </Typography.Title>

        {/* Alert Messages */}
        {serverMessage && (
          <Alert
            message={serverMessage}
            type="success"
            showIcon
            className="mb-4"
          />
        )}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form
          name="forgot-password"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          {/* Email Field */}
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
              placeholder="Email Address"
              size="large"
              className={`${darkMode ? "bg-gray-700 border-gray-600 " : ""}`}
            />
          </Form.Item>

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
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>

        {/* Back to Login Prompt */}
        <div className="text-center">
          <Typography.Text
            className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Remember your password?{" "}
            <Link to="/login" className={linkColor}>
              Log in
            </Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
