import { message } from "antd";
import React from "react";

export default function Blogs() {
  const blogPosts = [
    {
      title: "Top Scholarships for 2024",
      description:
        "Discover the best scholarships available for students in 2024. Apply now and secure your future!",
      image: "https://readymadeui.com/images/food.webp",
      date: "12 December 2024",
      link: "#",
    },
    {
      title: "How to Apply for Scholarships",
      description:
        "Step-by-step guide on how to apply for various scholarships, with tips and advice.",
      image: "https://readymadeui.com/images/food11.webp",
      date: "10 December 2024",
      link: "#",
    },
    {
      title: "Scholarships for International Students",
      description:
        "Find out about scholarships specifically for international students looking to study abroad.",
      image: "https://readymadeui.com/images/food22.webp",
      date: "08 December 2024",
      link: "#",
    },
    {
      title: "Scholarships for Women in STEM",
      description:
        "Explore scholarships designed to encourage women to pursue careers in science, technology, engineering, and math.",
      image: "https://readymadeui.com/images/food33.webp",
      date: "05 December 2024",
      link: "#",
    },
  ];

  return (
    <>
      <div className="p-4 font-[sans-serif]">
        <div className="max-w-6xl max-lg:max-w-6xl max-sm:max-w-sm mx-auto">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-12  leading-10">
              Latest blogs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-t-xl overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{post.description}</p>
                  <p className="text-gray-800 text-[13px] font-semibold mt-4">
                    {post.date}
                  </p>
                  <button onClick={()=>message.success(`will view blog ${post.title}`,0.9)} className="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-yellow-500 hover:bg-yellow-700 text-white text-[13px]">
                    Read More
                  </button>
                  {/* <a
                    href={post.link}
                    className="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-purple-600 hover:bg-purple-700 text-white text-[13px]"
                  >
                    Read More
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
