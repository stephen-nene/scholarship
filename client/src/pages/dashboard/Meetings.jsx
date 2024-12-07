import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdInfo,
  MdOutlineDelete,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeetings } from "../../helpers/admins";

export default function Meetings({ darkMode }) {
  const [meetings, setMeetings] = useState([]);
  const [meta, setMeta] = useState({});
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const paginatedMeetings = useSelector((state) => state.app.paginatedMeetings);
  const dispatch = useDispatch();

  const statusStyles = {
    approved: "bg-green-500 text-green-800",
    pending: "bg-yellow-400 text-yellow-900",
    cancelled: "bg-red-400 text-gray-800",
    completed: "bg-blue-400 text-blue-800",
  };

  const getMeetings = async (page = 1) => {
    if (paginatedMeetings[page]) {
      setMeetings(paginatedMeetings[page].meetings);
      setMeta(paginatedMeetings[page].meta);
      return paginatedMeetings[page];
    }
    try {
      const response = await fetchMeetings(page, dispatch);
      if (response.status === 200) {
        setMeetings(response?.meetings);
        setMeta(response?.meta);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
      message.error("Failed to fetch meetings.");
    }
  };

  useEffect(() => {
    if (meetings) {
      getMeetings();
    }
  }, []);

  const showDetails = (meeting) => {
    setSelectedMeeting(meeting);
  };

  const closeDetails = () => {
    setSelectedMeeting(null);
  };

  return (
    <div
      className={`h-screen pt-3 font-[sans-serif] overflow-x-auto ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="filters">
        <label>Status:</label>
        <select>
          <option value="">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>
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
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Meeting Type</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings?.map((meeting) => (
            <tr
              key={meeting.id}
              className={`odd:bg-blue-50 ${
                darkMode ? "odd:bg-gray-700" : "odd:bg-blue-50"
              }`}
            >
              <td className="p-4">{meeting.title}</td>
              <td className="p-4">{new Date(meeting.date).toLocaleString()}</td>
              <td className="p-4">
                <span
                  className={`py-1 px-2 rounded-full text-xs ${
                    statusStyles[meeting.status] ||
                    "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {meeting.status}
                </span>
              </td>
              <td className="p-4">
                {meeting.meet_type.replace("_meeting", "")}
              </td>
              <td className="text-xl p-4">
                <button
                  onClick={() => showDetails(meeting)}
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
                    onClick={() => message.error(`delete ${meeting.title}`)}
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
          Showing {meetings?.length} of {meta?.total_count || "?"} entries
        </p>

        <div className="flex items-center max-md:mt-4">
          <ul className="flex space-x-1 ml-2 text-xl">
            {/* Previous Page Button */}
            <button
              onClick={() => getMeetings(meta?.current_page - 1)}
              className={`flex items-center justify-center w-7 h-7 rounded ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600"
              }`}
              aria-label="Previous Page"
              disabled={meta?.current_page === 1}
            >
              <MdOutlineChevronLeft />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: meta?.total_pages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === meta?.current_page;

              return (
                <button
                  onClick={() => getMeetings(pageNumber)}
                  key={index}
                  className={`flex items-center justify-center text-sm w-7 h-7 rounded ${
                    isActive
                      ? darkMode
                        ? "bg-gray-400 text-white"
                        : "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-200 hover:bg-gray-400 text-gray-800"
                  }`}
                  aria-label={`Page ${pageNumber}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next Page Button */}
            <button
              onClick={() => getMeetings(meta?.current_page + 1)}
              className={`flex items-center justify-center w-7 h-7 rounded ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-700 text-gray-300"
                  : "bg-blue-100 hover:bg-blue-300 text-blue-600"
              }`}
              aria-label="Next Page"
              disabled={meta?.next_page === null}
            >
              <MdOutlineChevronRight />
            </button>
          </ul>
        </div>
      </div>

      {/* Modal for Detailed View */}
      <Modal
        title={selectedMeeting?.title}
        open={!!selectedMeeting}
        onCancel={closeDetails}
        footer={null}
        centered
      >
        {selectedMeeting && (
          <div>
            <p>
              <strong>Description:</strong> {selectedMeeting.description}
            </p>
            <p>
              <strong>Meeting Type:</strong> {selectedMeeting.meet_type}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedMeeting.date).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {selectedMeeting.status}
            </p>
            <p>
              <strong>Meeting Link:</strong>{" "}
              <a
                href={selectedMeeting.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Here
              </a>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
