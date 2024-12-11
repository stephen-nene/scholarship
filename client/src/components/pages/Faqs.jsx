import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaInfoCircle,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const faqData = [
  {
    category: "Eligibility",
    icon: <FaQuestionCircle />,
    faqs: [
      {
        question: "Who is eligible to apply for scholarships?",
        answer:
          "Eligibility varies by scholarship, but typically includes factors such as academic performance, field of study, nationality, financial need, and demographic background. Most scholarships have specific criteria like minimum GPA, current academic level (undergraduate/graduate), and specific major requirements.",
        details: [
          "Academic performance (usually 3.0+ GPA)",
          "Specific major or field of study",
          "Citizenship or residency requirements",
          "Financial need assessment",
          "Extracurricular achievements",
        ],
      },
      {
        question: "Can international students apply for scholarships?",
        answer:
          "Many scholarships welcome international students, but requirements differ. Some are country-specific, while others are open globally. Always check individual scholarship details for international student provisions.",
        details: [
          "Some scholarships require English proficiency (TOEFL/IELTS)",
          "Visa and immigration status may be considered",
          "Additional documentation might be needed",
          "Partial vs. full scholarship variations",
        ],
      },
    ],
  },
  {
    category: "Application Process",
    icon: <FaInfoCircle />,
    faqs: [
      {
        question:
          "What documents are typically required for a scholarship application?",
        answer:
          "Scholarship applications usually require a comprehensive documentation package to assess your qualifications thoroughly.",
        details: [
          "Academic transcripts",
          "Standardized test scores (SAT/ACT/GRE)",
          "Personal statement or essay",
          "Letters of recommendation",
          "Proof of financial need",
          "Passport or national ID",
          "Detailed resume/CV",
        ],
      },
      {
        question: "How competitive are scholarship applications?",
        answer:
          "Scholarship competitiveness varies widely. Some have acceptance rates as low as 1-5%, while others might be more accessible. Factors like unique backgrounds, exceptional achievements, and well-crafted applications increase your chances.",
        details: [
          "Top scholarships receive thousands of applications",
          "Differentiate yourself through compelling narratives",
          "Highlight unique experiences and achievements",
          "Demonstrate alignment with scholarship goals",
        ],
      },
    ],
  },
  {
    category: "Financial Details",
    icon: <FaMoneyBillWave />,
    faqs: [
      {
        question: "What expenses do scholarships typically cover?",
        answer:
          "Scholarship coverage varies significantly. Some provide full tuition, while others might cover partial expenses or offer specific allowances.",
        details: [
          "Tuition and academic fees",
          "Living expenses and accommodation",
          "Books and study materials",
          "Travel grants",
          "Health insurance",
          "Research or internship funding",
        ],
      },
      {
        question: "Are scholarship funds taxable?",
        answer:
          "Scholarship taxation depends on usage and local tax laws. Generally, funds used for direct educational expenses are tax-free, but personal expenses might be taxable.",
        details: [
          "Consult tax professionals for specific guidance",
          "IRS has specific rules for scholarship income",
          "Different rules for domestic vs. international students",
          "Keep detailed records of fund usage",
        ],
      },
    ],
  },
  {
    category: "Maintenance & Renewal",
    icon: <FaCheckCircle />,
    faqs: [
      {
        question: "How do I maintain my scholarship?",
        answer:
          "Most scholarships require ongoing academic performance and compliance with specific conditions to remain eligible.",
        details: [
          "Maintain minimum GPA (usually 3.0+)",
          "Complete required credit hours each semester",
          "Participate in specified activities or mentorship",
          "Submit periodic progress reports",
          "Maintain good disciplinary standing",
        ],
      },
    ],
  },
];

export default function Faqs() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenFaqIndex(null); // Close any open FAQ when switching categories
  };

  const toggleFaq = (categoryIndex, faqIndex) => {
    if (openCategory !== categoryIndex) {
      setOpenCategory(categoryIndex); // Open the new category if it's not already open
    }
    setOpenFaqIndex(openFaqIndex === faqIndex ? null : faqIndex);
  };

  return (
    <div className="font-[sans-serif] space-y-6 max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Scholarship Application FAQs
      </h2>

      {faqData.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="border border-gray-200 rounded-lg shadow-sm mb-4"
        >
          <div
            onClick={() => toggleCategory(categoryIndex)}
            className="w-full flex items-center justify-between p-5 text-xl font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex items-center">
              {category.icon}
              <span className="ml-3">{category.category}</span>
            </div>
            {openCategory === categoryIndex ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </div>

          {openCategory === categoryIndex && (
            <div className="px-4 pb-4">
              {category.faqs.map((faq, faqIndex) => (
                <div
                  key={faqIndex}
                  className={`border-t border-gray-100 py-2 ${
                    openFaqIndex === faqIndex ? "bg-blue-50" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(categoryIndex, faqIndex)}
                    className="w-full text-left flex items-center justify-between p-3 text-base text-gray-700 hover:bg-blue-100 transition"
                  >
                    {faq.question}
                    {openFaqIndex === faqIndex ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>

                  {openFaqIndex === faqIndex && (
                    <div className="p-4 bg-white rounded-b-lg">
                      <p className="text-gray-600 mb-4">{faq.answer}</p>
                      {faq.details && (
                        <ul className="list-disc list-inside text-gray-500 text-sm space-y-1">
                          {faq.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
