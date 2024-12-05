import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { Link } from "react-router-dom";
export const Forgot = ({ darkMode = false }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      console.log("Password reset request:", values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Password reset email sent successfully!");
    } catch (error) {
      message.error("Failed to send password reset email.");
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
