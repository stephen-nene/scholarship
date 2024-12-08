import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaEdit, FaSave } from 'react-icons/fa';
import { message } from 'antd';
import apiClient from '../../../helpers/auth';

// Constants
const STATUS_OPTIONS = [
  { label: 'Pending', value: 0 },
  { label: 'Approved', value: 1 },
  { label: 'Completed', value: 2 },
  { label: 'Cancelled', value: 3 }
];

const MEET_TYPE_OPTIONS = [
  { label: 'Group Meeting', value: 0 },
  { label: 'Personal Meeting', value: 1 }
];

export default function MeetingDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [meeting, setMeeting] = useState(
    location.state?.meeting || null
  );
  const [editableFields, setEditableFields] = useState({});

  // Fetch meeting data if not available in location state
  useEffect(() => {
    const fetchMeeting = async () => {
      if (!meeting) {
        try {
          const { data } = await apiClient.get(`/meetings/${id}`);
          setMeeting(data);
        } catch (error) {
          message.error('Failed to load meeting details');
        }
      }
    };

    fetchMeeting();
  }, [id, meeting]);

  // Rendering helpers
  const renderSelectField = (value, options, onChange) => (
    <select
      value={value}
      className="w-1/2 p-2 rounded border border-gray-300 focus:border-blue-500"
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const renderField = (key, value) => {
    const isEditing = editableFields[key];

    // Special rendering for different field types
    switch (key) {
      case 'status':
        return renderSelectField(
          value, 
          STATUS_OPTIONS, 
          (newValue) => handleInputChange(key, newValue)
        );
      
      case 'meet_type':
        return renderSelectField(
          value, 
          MEET_TYPE_OPTIONS, 
          (newValue) => handleInputChange(key, newValue)
        );

      case 'participants':
        return (
          <ul className="list-disc pl-4">
            {value?.map((participant, index) => (
              <li key={index}>
                {participant.username} ({participant.email})
              </li>
            ))}
          </ul>
        );
        case 'participants':
          return (
            <ul className="list-disc pl-4">
              {value?.map((participant, index) => (
                <li key={index}>
                  {participant.username} ({participant.email})
                </li>
              ))}
            </ul>
          );
  
        case 'scholarship':
        case 'admin':
          return (
            <div className="space-y-2">
              {Object.entries(value).map(([nestedKey, nestedValue]) => (
                <div key={nestedKey} className="flex items-center justify-between">
                  <span className="capitalize">
                    {nestedKey.replace('_', ' ')}:
                  </span>
                  <span>{nestedValue}</span>
                </div>
              ))}
            </div>
          );

      default:
        return (
          <input
            type="text"
            value={value}
            readOnly={!isEditing}
            className={`w-1/2 p-2 rounded border ${
              isEditing 
                ? 'border-blue-500 bg-white' 
                : 'border-gray-300 bg-gray-100'
            }`}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        );
    }
  };

  // Event Handlers
  const toggleEdit = (field) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange = (field, value) => {
    setMeeting(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSave = async () => {
    if (!meeting) return;

    try {
      const { data } = await apiClient.patch(`/meetings/${id}`, meeting);
      
      message.success('Meeting updated successfully');
      setMeeting(data);
      setEditableFields({});
    } catch (error) {
      message.error('Failed to update meeting');
    }
  };

  // Render
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Meeting Details</h1>
        
        {meeting ? (
          <div className="space-y-4">
            {Object.entries(meeting).map(([key, value]) => (
              <div 
                key={key} 
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <label className="font-medium capitalize w-1/4">
                  {key.replace('_', ' ')}
                </label>
                
                {renderField(key, value)}
                
                <button
                  className="ml-4 text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={() => 
                    editableFields[key] ? handleSave() : toggleEdit(key)
                  }
                >
                  {editableFields[key] ? <FaSave /> : <FaEdit />}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading meeting details...</p>
        )}
      </div>
    </div>
  );
}