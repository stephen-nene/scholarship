import React from "react";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
} from "react-icons/md";
import { useSelector } from "react-redux";

const Pagination = ({ meta, onPageChange }) => {
  const darkMode = useSelector((state) => state.app.darkMode);
// console.log(meta)
  return (
    <div
      className={`sm:flex items-center  m-4 ${
        darkMode ? " text-gray-200" : " text-gray-900"
      }`}
    >
      <p className="text-sm flex-1">
        Showing { meta.next_page? meta.per_page: meta.total_count-meta.offset_value } of {meta.total_count || "?"} entries
      </p>

      <div className="flex items-center max-md:mt-4">
        <ul className="flex space-x-1 ml-2 text-xl">
          {/* Previous Page Button */}
          <button
            onClick={() => onPageChange(meta?.current_page - 1)}
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
                onClick={() => onPageChange(pageNumber)}
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
            onClick={() => onPageChange(meta?.current_page + 1)}
            className={` flex items-center justify-center w-7 h-7 rounded ${
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
  );
};

export default Pagination;