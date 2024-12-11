import React from "react";
import bgimg from '../../../assets/images/bgimg.png';

export default function Newsletter() {
  return (
    <>
      <div className="relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-40 before:z-10">
        <img src={bgimg} alt="Banner Image" className="absolute inset-0 w-full h-full object-cover object-bottom" />
        <div className="min-h-[400px] relative z-50 h-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center px-6 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-white md:text-5xl text-4xl font-bold">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-300 text-sm mt-6">
            We are dedicated to empowering students by providing access to financial resources that make education attainable for al
            </p>

            <div className="max-w-lg mx-auto bg-gray-100 flex p-1 rounded-full text-left mt-12 border focus-within:border-gray-700">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-sm text-gray-800 px-4 py-3"
              />
              <button
                type="button"
                className="bg-yellow-500 hover:bg-yellow-700 transition-all text-black tracking-wide text-sm rounded-full px-6 py-3"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
