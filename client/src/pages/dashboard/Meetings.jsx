import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeetings } from "../../helpers/admins";
import DashTable from "../../components/DashTable";
import Pagination from "../../components/Pagination";
import { message, Modal,FloatButton } from "antd"; // Add Modal import
import { PlusOutlined } from "@ant-design/icons";

export default function Meetings({ darkMode }) {
  const [meetings, setMeetings] = useState([]);
  const [meta, setMeta] = useState({});
  const [selectedMeeting, setSelectedMeeting] = useState(null); // Add state for selected meeting
  const dispatch = useDispatch();
  const paginatedMeetings = useSelector((state) => state.app.paginatedMeetings);

  const getMeetings = async (page = 1) => {
    if (paginatedMeetings[page]) {
      setMeta(paginatedMeetings[page].meta);
      setMeetings(paginatedMeetings[page].meetings);
      return paginatedMeetings[page];
    }

    try {
      const data = await fetchMeetings(page, dispatch);
      setMeta(data.meta);
      setMeetings(data.meetings);
    } catch (error) {
      console.error("Failed to get meetings for page:", page);
    }
  };

  useEffect(() => {
    getMeetings();
  }, []);

  const handleEdit = (meeting) => {
    // Implement edit logic
    message.success(`Editing meeting: ${meeting.title}`, 1);
  };

  const handleDelete = (meeting) => {
    // Implement delete logic
    message.error(`Deleting meeting: ${meeting.title}`, 1);
  };

  const showDetails = (meeting) => {
    setSelectedMeeting(meeting); // Set selected meeting for modal
  };

  const closeDetails = () => {
    setSelectedMeeting(null); // Close the modal
  };

  // Define columns for meetings
  const meetingColumns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      renderCell: (item) => (
        <span
          onClick={() => showDetails(item)} // Open modal on title click
          className="text-bl ue-600 cursor-pointer hover:underline"
        >
          {item.title}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      renderCell: (item) => {
        const [date, time] = new Date(item.date).toLocaleString().split(", ");
        return (
          <div>
            <div>{date}</div>
            <div>{time}</div>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      type: "status",
      sortable: true,
    },
    {
      key: "meet_type",
      label: "Type",
      sortable: true,
      renderCell: (item) => item.meet_type.replace("_meeting", ""),
    },
  ];

  return (
    <div
      className={`min-h-screen font-[sans-serif] overflow-x-auto ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <DashTable
        data={meetings}
        columns={meetingColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        renderCustomCell={(item, column) =>
          column.renderCell ? column.renderCell(item) : item[column.key]
        }
      />
      <Pagination meta={meta} onPageChange={getMeetings} />
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Create New Meeting</div>}
        onClick={() => {
          message.success("Creating new Meeting...");
        }}
      />
      {/* Modal for Detailed View */}
      <Modal
        title={selectedMeeting?.title}
        open={!!selectedMeeting} // Show modal if there's a selected meeting
        onCancel={closeDetails} // Close modal on cancel
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
