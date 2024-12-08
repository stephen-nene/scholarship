import React from "react";
import { MdEdit, MdOutlineDelete, MdSort } from "react-icons/md";
import { useSelector } from "react-redux";

const DashTable = ({ data, columns, onEdit, onDelete }) => {
  const darkMode = useSelector((state) => state.app.darkMode);

  const getBadgeColor = (status) => {
    const badgeColors = {
      // fuchsia
      pending: "bg-orange-400 text-orange-950",
      approved: "bg-green-400 text-green-800",
      completed: "bg-blue-400 text-blue-950",
      cancelled: "bg-red-400 text-red-950",
      active: "bg-green-400 text-green-950",
      archived: "bg-gray-300 text-gray-800",
      deactivated: "bg-rose-200 text-rose-800",
      suspended: "bg-rose-400 text-rose-950",
      default: "bg-gray-200 text-gray-800",
      user: "bg-blue-200 text-blue-800",
      provider: "bg-yellow-300 text-yellow-950",
      admin: "bg-cyan-400 text-cyan-950",
      default: "bg-gray-200 text-gray-800",
    };

    return badgeColors[status] || badgeColors["default"];
  };

  // Default render for standard cells
  const defaultRenderCell = (item, column) => {
    // Handling 'status' column type
    if (column.type === "status") {
      return (
        <span
          className={`py-1 px-2 rounded-full text-xs ${getBadgeColor(
            item[column.key]
          )}`}
        >
          {item[column.key]}
        </span>
      );
    }

    // Handling 'role' column type
    if (column.role === "role") {
      return (
        <span
          className={`py-1 px-2 rounded-full text-xs ${getBadgeColor(
            item[column.key]
          )}`}
        >
          {getRoleLabel(item[column.key])}
        </span>
      );
    }

    // Default rendering for other columns
    return item[column.key];
  };

  return (
    <div className="mb-12">
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
            {columns.map((column) => (
              <th key={column.key} className="p-4">
                <div className="flex items-center gap-x-1">
                  {column.label}
                  {column.sortable && <MdSort />}
                </div>
              </th>
            ))}
            {(onEdit || onDelete) && <th className="p-4">Actions</th>}
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {data?.map((item, index) => (
            <tr
              key={item.id || index}
              className={`odd:bg-blue-50 ${
                darkMode ? "odd:bg-gray-700" : "odd:bg-blue-50"
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className="p-4 text-sm">
                  {column.renderCell
                    ? column.renderCell(item) // Use column's renderCell if available
                    : defaultRenderCell(item, column)}{" "}
                  {/* Otherwise fallback */}
                </td>
              ))}

              {(onEdit || onDelete) && (
                <td className="p-4 text-2xl">
                  {onEdit && (
                    <button
                      className={`mr-4 ${
                        darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                      }`}
                      onClick={() => onEdit(item)}
                      title="Edit"
                    >
                      <MdEdit />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className={`${
                        darkMode ? "hover:text-red-400" : "hover:text-red-600"
                      }`}
                      onClick={() => onDelete(item)}
                      title="Delete"
                    >
                      <MdOutlineDelete />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashTable;
