import React, { useState } from "react";
import { message, Select, Input, Button, Space } from "antd";
import apiClient from "../helpers/apiClient";

const options = [
  { label: "Engineering", value: 0 },
  { label: "Computer Science", value: 1 },
  { label: "Mathematics", value: 2 },
  { label: "Medicine", value: 10 },
  { label: "Pharmacy", value: 11 },
  { label: "Business", value: 20 },
];

export const Home = ({ darkMode }) => {
  const [filters, setFilters] = useState({
    status: "",
    level: "",
    major: [],
    funding_type: "",
    country: "",
    min_funding: "",
    max_funding: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    console.log("Searching...", filters);

    const formattedFilters = { ...filters };
    if (Array.isArray(filters.major)) {
      formattedFilters.major = filters.major;
    } else if (filters.major) {
      formattedFilters.major = [filters.major];
    }

    try {
      const response = await apiClient.get("/scholarships", {
        params: formattedFilters,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      message.error("No scholarships found with the provided filters.");
    }
  };

  return (
    <div
      className={`font-sans py-12 px-4 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-[#E4FE66] via-lime-500 to-[#55F5A3]"
      }`}
    >
      <div className="text-center p-5 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          Discover International{" "}
          <span className="text-yellow-500">Scholarships</span> for Your Future
        </h2>
        <p className="text-lg mb-6 leading-relaxed">
          Explore scholarships worldwide and find financial resources that make
          your education dreams a reality.
        </p>

        <div className="filters bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Level Selection */}
            <Select
              className="text-black w-full"
              placeholder="Select Level"
              size="large"
              name="level"
              value={filters.level}
              onChange={(value) => handleSelectChange(value, "level")}
            >
              <Select.Option value="">Select Level</Select.Option>
              <Select.Option value="undergraduate">Undergraduate</Select.Option>
              <Select.Option value="postgraduate">Postgraduate</Select.Option>
              <Select.Option value="phd">PhD</Select.Option>
            </Select>

            {/* Major Selection */}
            <Select
              mode="multiple"
              value={filters.major}
              onChange={(value) => handleSelectChange(value, "major")}
              placeholder="Select Majors"
              className="w-full"
              size="large"
              options={options}
            />

            {/* Funding Type Selection */}
            <Select
              name="funding_type"
              value={filters.funding_type}
              onChange={(value) => handleSelectChange(value, "funding_type")}
              placeholder="Funding Type"
              className="w-full"
              size="large"
            >
              <Select.Option value="">Select Funding Type</Select.Option>
              <Select.Option value="full_scholarship">Full</Select.Option>
              <Select.Option value="partial_scholarship">Partial</Select.Option>
              <Select.Option value="tuition_only">Tuition Only</Select.Option>
              <Select.Option value="living_expenses">
                Living Expenses
              </Select.Option>
              <Select.Option value="research_grant">
                Research Grant
              </Select.Option>
              <Select.Option value="travel_grant">Travel Grant</Select.Option>
            </Select>

            {/* Country Selection */}
            <Select
              name="country"
              value={filters.country}
              onChange={(value) => handleSelectChange(value, "country")}
              placeholder="Select Country"
              className="w-full"
              size="large"
              // options={options}
            >
              <Select.Option value="">Select Country</Select.Option>
              <Select.Option value="us">United States</Select.Option>
              <Select.Option value="uk">United Kingdom</Select.Option>
              <Select.Option value="canada">Canada</Select.Option>
              <Select.Option value="australia">Australia</Select.Option>
            </Select>

            {/* Min Funding */}
            <Input
              type="number"
              name="min_funding"
              value={filters.min_funding}
              onChange={handleChange}
              placeholder="Min Funding"
              className="w-full"
              size="large"
            />

            {/* Max Funding */}
            <Input
              type="number"
              name="max_funding"
              value={filters.max_funding}
              onChange={handleChange}
              placeholder="Max Funding"
              className="w-full"
              size="large"
            />
          </div>

          {/* Search and Clear Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Button
              onClick={handleSearch}
              type="primary"
              className="w-full sm:w-auto"
              size="large"
            >
              Search
            </Button>
            {Object.values(filters).some((value) => value !== "") && (
              <Button
                onClick={() => setFilters({})}
                size="large"
                color="danger"
                variant="outlined"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 items-center mt-12">
          <div className="flex flex-col items-center text-center">
            <h5 className="font-bold text-2xl text-blue-600 mb-2">10+</h5>
            <p className="text-gray-600 text-sm font-semibold">
              Years Experience
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h5 className="font-bold text-2xl text-blue-600 mb-2">890+</h5>
            <p className="text-gray-600 text-sm font-semibold">
              Students placed
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h5 className="font-bold text-2xl text-blue-600 mb-2">$25B+</h5>
            <p className="text-gray-600 text-sm font-semibold">
              Funds dispatched
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
