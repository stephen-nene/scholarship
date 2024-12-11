import React, { useState } from "react";
import { Form, Input, DatePicker, Select, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Option } = Select;

const MeetingBookingPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  console.log(userData);
  const handleSubmit = (values) => {
    // Log the meeting details to console (replace with actual booking logic)
    console.log("Meeting Booking Details:", values);

    // Show success message
    message.success("Meeting request submitted successfully!");


  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Book a One-on-One Meeting
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="john.doe@example.com" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="+1 (555) 123-4567" style={{ width: "100%" }} />
        </Form.Item>

        {/* Meeting Preferences */}
        {userData && userData.role === "admin" && (
          <Form.Item
            name="meetingType"
            label="Meeting Type"
            rules={[
              { required: true, message: "Please select a meeting type" },
            ]}
          >
            <Select placeholder="Select meeting type">
              <Option value="scholarship_details">Group</Option>
              <Option value="application_support">private</Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="preferredDateTime"
          label="Preferred Meeting Date and Time"
          rules={[{ required: true, message: "Please select a date and time" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" className="w-full" />
        </Form.Item>

        <Form.Item name="additionalNotes" label="Additional Notes">
          <Input.TextArea
            rows={4}
            placeholder="Any additional information you'd like to share"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Schedule Meeting
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MeetingBookingPage;
