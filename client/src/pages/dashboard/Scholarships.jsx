import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdInfo,
  MdOutlineDelete,
} from "react-icons/md";

export default function Scholarships({ darkMode }) {
  const [scholarships, setScholarships] = useState([]);
  const [meta, setMeta] = useState({});
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const statusStyles = {
    active: "bg-green-400 text-green-800",
    archived: "bg-yellow-400 text-yellow-900",
    deactivated: "bg-red-400 text-gray-800",
  };
  const fetchScholarships = async (page = 1) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/scholarships?page=${page}`
      );
      const data = await response.json();
      setScholarships(data.scholarships);
      setMeta(data.meta);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      message.error("Failed to fetch scholarships.");
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const showDetails = (scholarship) => {
    setSelectedScholarship(scholarship);
  };

  const closeDetails = () => {
    setSelectedScholarship(null);
  };

  return (
    <div
      className={`h-screen font-[sans-serif] overflow-x-auto ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <table
        className={`min-w-full ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black"
        }`}
      >
        <thead
          className={`whitespace-nowrap text-md text-left font-semibold ${
            darkMode ? "text-gray-400" : "text-black"
          }`}
        >
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Funding Amount</th>
            <th className="p-4">Deadline</th>
            <th className="p-4">Status</th>
            <th className="p-4">Level</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((scholarship) => (
            <tr
              key={scholarship.id}
              className={`odd:bg-blue-50 ${
                darkMode ? "odd:bg-gray-700" : "odd:bg-blue-50"
              }`}
            >
              <td className="p-4">{scholarship.title}</td>
              <td className="p-4">
                $ {scholarship.funding_amount.toLocaleString()}
              </td>
              <td className="p-4">
                {new Date(scholarship.deadline).toLocaleDateString()}
              </td>
              <td className="p-4">
                <span
                  className={`py-1 px-2 rounded-full text-xs ${
                    statusStyles[scholarship.status] ||
                    "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {scholarship.status}
                </span>
              </td>
              <td className="p-4">
                {scholarship.level}
              </td>
              <td className="text-xl p-4">
                <button
                  onClick={() => showDetails(scholarship)}
                  className={`mr-4 ${
                    darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                  title="View Details"
                >
                  <MdInfo />
                </button>
                <button
                  className={`mr-4 ${
                    darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                  }`}
                >
                  <MdOutlineDelete
                    onClick={() => message.error(`delete ${scholarship.title}`)}
                    className={`mr-4 ${
                      darkMode ? "hover:text-red-400" : "hover:text-red-600"
                    }`}
                    title="Delete"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={`md:flex m-4 ${
          darkMode ? " text-gray-200" : " text-gray-900"
        }`}
      >
        <p className="text-sm flex-1">
          Showing {scholarships.length} of {meta.total_count || "?"} entries
        </p>

        <div className="flex items-center max-md:mt-4">
          <ul className="flex space-x-1 ml-2 text-xl">
            {/* Previous Page Button */}
            {meta?.current_page !== 1 && (
              <li
                onClick={() => fetchScholarships(meta?.current_page - 1)}
                className={`flex items-center justify-center cursor-pointer w-7 h-7 rounded ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                }`}
              >
                <MdOutlineChevronLeft />
              </li>
            )}

            {/* Page Numbers */}
            {Array.from({ length: meta?.total_pages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === meta?.current_page;

              return (
                <li
                  onClick={() => fetchScholarships(pageNumber)}
                  key={index}
                  className={`flex items-center justify-center cursor-pointer text-sm w-7 h-7 rounded ${
                    isActive
                      ? darkMode
                        ? "bg-gray-400 text-white"
                        : "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-200 hover:bg-gray-400 text-gray-800"
                  }`}
                >
                  {pageNumber}
                </li>
              );
            })}

            {/* Next Page Button */}
            {meta?.next_page && (
              <li
                onClick={() => fetchScholarships(meta?.current_page + 1)}
                className={`flex items-center justify-center cursor-pointer w-7 h-7 rounded ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-700 text-gray-300"
                    : "bg-blue-100 hover:bg-blue-300 text-blue-600"
                }`}
              >
                <MdOutlineChevronRight />
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* Modal for Detailed View */}
      <Modal
        title={selectedScholarship?.title}
        open={!!selectedScholarship}
        onCancel={closeDetails}
        footer={null}
        centered
      >
        {selectedScholarship && (
          <div>
            <p>
              <strong>Description:</strong>{" "}
              {selectedScholarship.description.summary}
            </p>
            <p>
              <strong>Degree Name:</strong>{" "}
              {selectedScholarship.description.degree_name}
            </p>
            <p>
              <strong>Eligibility:</strong>{" "}
              {selectedScholarship.eligibility_criteria.age_range},{" "}
              {selectedScholarship.eligibility_criteria.country_specific}
            </p>
            <p>
              <strong>Funding Amount:</strong> $
              {selectedScholarship.funding_amount.toLocaleString()}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(selectedScholarship.deadline).toLocaleDateString()}
            </p>
            <p>
              <strong>Application Link:</strong>{" "}
              <a
                href={selectedScholarship.application_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Here
              </a>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
