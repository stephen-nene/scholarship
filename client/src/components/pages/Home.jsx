import React, { useState } from "react";
import Filters from "./wrappers/Filters";
import Blogs from "./wrappers/Blogs";
import Features from "./wrappers/Features";

export const Home = ({ darkMode }) => {
  return (
    <>
      <div
        className={`font-sans py-[56px] px-4 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-300"
          // : "bg-gradient-to-r from-[#768fff] via-li me-500 to-[#55F5A3]"
        }`}
      >
        <div className="text-center p-5 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Discover International{" "}
            <span className="text-yellow-500">Scholarships</span> for Your
            Future
          </h2>
          <p className="text-lg mb-6 leading-relaxed">
            Explore scholarships worldwide and find financial resources that
            make your education dreams a reality.
          </p>

          <Filters darkMode={darkMode} />

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
        <Features darkMode={darkMode} />
      <Blogs />

      </div>
    </>
  );
};
