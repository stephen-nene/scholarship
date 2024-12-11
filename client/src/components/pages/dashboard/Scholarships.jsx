import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
import { MdInfo, MdOutlineDelete } from "react-icons/md";
import { fetchScholarships } from "../../helpers/admins.js";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/Pagination.jsx";
import DashTable from "../../components/DashTable.jsx";

export default function Scholarships({ darkMode }) {
  const [scholarships, setScholarships] = useState([]);
  const [meta, setMeta] = useState({});
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const paginatedScholarships = useSelector((e) => e.app.paginatedScholarships);
  const dispatch = useDispatch();
  const statusStyles = {
    active: "bg-green-400 text-green-800",
    archived: "bg-yellow-400 text-yellow-900",
    deactivated: "bg-red-400 text-gray-800",
  };
  const getScholarships = async (page = 1) => {
    if (paginatedScholarships[page]) {
      setScholarships(paginatedScholarships[page].scholarships);
      setMeta(paginatedScholarships[page].meta);
      return paginatedScholarships[page];
    }
    try {
      const response = await fetchScholarships(page, dispatch);
      setScholarships(response?.scholarships);
      setMeta(response?.meta);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      message.error("Failed to fetch scholarships.");
    }
  };

  useEffect(() => {
    getScholarships();
  }, []);

  const showDetails = (scholarship) => {
    setSelectedScholarship(scholarship);
  };

  const closeDetails = () => {
    setSelectedScholarship(null);
  };
  const handleDelete = (scholarship) => {
    message.error(`Delete ${scholarship.title}`);
    // Implement actual delete logic here
  };

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "funding_amount",
      label: "Funding Amount",
      renderCell: (item) => `$ ${item.funding_amount.toLocaleString()}`,
    },
    {
      key: "deadline",
      label: "Deadline",
      renderCell: (item) => new Date(item.deadline).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      type: "status",
    },
    {
      key: "level",
      label: "Level",
    },
  ];

  return (
    <div
      className={`min-h-screen font-[sans-serif] overflow-x-auto `}
    >
      {/* <table
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
              <td className="p-4">{scholarship.level}</td>
              <td className=" text-xl ">
                <div className="flex ">
                  <MdInfo
                    onClick={() => showDetails(scholarship)}
                    className={`mr-4 cursor-pointer ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                    title="View"
                  />
                  <MdOutlineDelete
                    onClick={() =>
                      message.error(`delete ${scholarship.title}`)
                    }
                    className={`mr-4 ${
                      darkMode ? "hover:text-red-400" : "hover:text-red-600"
                    }`}
                    title="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <DashTable
        data={scholarships}
        columns={columns}
        onEdit={showDetails}
        onDelete={handleDelete}
        />

      <Pagination meta={meta} onPageChange={getScholarships} />

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
