import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  message,
  Row,
  Col,
  Select,
} from "antd";

export const Register = ({ darkMode = false }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      // Validate and clean up data
      const cleanedValues = {
        ...values,
        fullName: `${values.firstName} ${values.middleName || ""} ${
          values.lastName
        }`.trim(),
      };

      // Simulate API call
      console.log("Registration data:", values, cleanedValues);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Account created successfully! Please log in.");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Consistent styling for dark and light modes
  const formStyles = {
    container: `min-h-screen flex items-center justify-center transition-colors duration-300 ${
      darkMode ? "bg-gray-900" : "bg-gray-100"
    }`,
    card: `w-full max-w-md p-8 space-y-6 rounded-xl border shadow-lg ${
      darkMode
        ? "bg-gray-800 border-gray-700 text-white"
        : "bg-white border-gray-300 text-gray-800"
    }`,
    input: darkMode ? "bg-gray-700 border-gray-600 " : "bg-white",
    title: `text-center mb-6 ${darkMode ? "text-white" : "text-gray-800"}`,
    linkText: darkMode
      ? "text-blue-400 hover:text-blue-300"
      : "text-blue-600 hover:text-blue-800",
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select className="w-[69px]"
        // style={{
        //   width: 70,
        // }}
      >
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className={formStyles.container}>
      <div className={formStyles.card}>
        <Typography.Title level={2} className={formStyles.title}>
          Create an Account
        </Typography.Title>

        <Form
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "First name is required",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="First Name"
                  size="large"
                  className={formStyles.input}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="middleName" className="mb-0">
                <Input
                  placeholder="Middle Name"
                  size="large"
                  className={formStyles.input}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Last name is required",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Last Name"
                  size="large"
                  className={formStyles.input}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid email",
              },
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input
              placeholder="Email Address"
              size="large"
              className={formStyles.input}
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Username is required",
                whitespace: true,
              },
            ]}
          >
            <Input
              placeholder="Username"
              size="large"
              className={formStyles.input}
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Phone number is required",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              placeholder="Phone Number"
              size="large"
              className={formStyles.input}
              max={10}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Password"
              size="large"
              className={formStyles.input}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Confirm Password"
              size="large"
              className={formStyles.input}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Typography.Text
            className={darkMode ? "text-gray-400" : "text-gray-600"}
          >
            Already have an account?{" "}
            <a href="/login" className={formStyles.linkText}>
              Log in
            </a>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default Register;