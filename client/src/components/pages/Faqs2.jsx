import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaRegCalendarAlt, FaMoneyBillWave, FaUniversity } from "react-icons/fa";
import { Button, message } from "antd";
import { Link } from "react-router-dom";

const scholarshipFaqData = [
  {
    icon: <FaQuestionCircle />,
    category: "Application Process",
    faqs: [
      {
        question: "What documents are required for a scholarship application?",
        answer: "Typically, you'll need to submit the following documents:\n" +
                "- Completed application form\n" +
                "- Academic transcripts\n" +
                "- Proof of income (family financial statement)\n" +
                "- Letter of recommendation from academic advisor\n" +
                "- Personal statement or essay\n" +
                "- Passport or government-issued ID\n" +
                "- Proof of enrollment or acceptance letter"
      },
      {
        question: "How long does the scholarship application process take?",
        answer: "The complete scholarship application process typically takes 6-10 weeks:\n" +
                "1. Initial application submission: 2-3 weeks\n" +
                "2. Document verification: 1-2 weeks\n" +
                "3. Interview (if applicable): 1 week\n" +
                "4. Final selection and notification: 2-4 weeks\n\n" +
                "Timelines may vary depending on the specific scholarship program."
      }
    ]
  },
  {
    icon: <FaRegCalendarAlt />,
    category: "Eligibility Criteria",
    faqs: [
      {
        question: "What are the basic eligibility requirements?",
        answer: "Eligibility criteria typically include:\n" +
                "- Academic performance (minimum GPA of 3.0)\n" +
                "- Enrollment in an accredited educational institution\n" +
                "- Specific field of study requirements\n" +
                "- Citizenship or residency status\n" +
                "- Age restrictions\n" +
                "- Demonstrated financial need\n" +
                "- Extracurricular activities and leadership experience"
      },
      {
        question: "Can international students apply?",
        answer: "International student eligibility varies by scholarship:\n" +
                "- Some scholarships are open to international students\n" +
                "- Others may be restricted to local or specific nationality students\n" +
                "- Additional requirements may include:\n" +
                "  * English language proficiency tests (TOEFL/IELTS)\n" +
                "  * Valid student visa\n" +
                "  * Translated academic documents\n\n" +
                "Always check the specific scholarship guidelines carefully."
      }
    ]
  },
  {
    icon: <FaMoneyBillWave />,
    category: "Financial Details",
    faqs: [
      {
        question: "What expenses does the scholarship cover?",
        answer: "Scholarship coverage can include:\n" +
                "- Full or partial tuition fees\n" +
                "- Living expenses\n" +
                "- Accommodation costs\n" +
                "- Study materials and books\n" +
                "- Research and project funding\n" +
                "- Travel grants\n" +
                "- Health insurance\n\n" +
                "Coverage varies widely between different scholarship programs."
      },
      {
        question: "How is scholarship money disbursed?",
        answer: "Scholarship funds are typically disbursed through:\n" +
                "- Direct payment to educational institution\n" +
                "- Semester or annual installments\n" +
                "- Reimbursement for specific expenses\n" +
                "- Direct bank transfer to student\n\n" +
                "Payment methods and schedules differ by scholarship provider."
      }
    ]
  },
  {
    icon: <FaUniversity />,
    category: "Academic Requirements",
    faqs: [
      {
        question: "How competitive are these scholarships?",
        answer: "Scholarship competition varies:\n" +
                "- Merit-based scholarships: Extremely competitive\n" +
                "- Need-based scholarships: Moderate competition\n" +
                "- Field-specific scholarships: Varies by discipline\n\n" +
                "Factors influencing competitiveness:\n" +
                "- Academic achievements\n" +
                "- Personal statement quality\n" +
                "- Recommendation letters\n" +
                "- Extracurricular involvement"
      }
    ]
  }
];

export default function ScholarshipFAQs() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const handleCategoryChange = (index) => {
      setActiveCategory(index);
      setOpenFaqIndex(null);
      setIsMobileMenuOpen(false);
    };
  
    const toggleFaq = (index) => {
      setOpenFaqIndex(openFaqIndex === index ? null : index);
    };
  
    const currentCategoryFaqs = scholarshipFaqData[activeCategory].faqs;
  
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-6 text-center">
          Scholarship Application FAQs
        </h2>
  
        {/* Mobile Category Selector */}
        <div className="block lg:hidden mb-6">
          <div className="relative">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between bg-blue-100 p-3 rounded-lg"
            >
              <span className="flex items-center">
                {scholarshipFaqData[activeCategory].icon}
                <span className="ml-2">
                  {scholarshipFaqData[activeCategory].category}
                </span>
              </span>
              {isMobileMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {isMobileMenuOpen && (
              <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-2">
                {scholarshipFaqData.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryChange(index)}
                    className={`w-full text-left p-3 flex items-center space-x-2 ${
                      activeCategory === index 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-blue-100'
                    }`}
                  >
                    {category.icon}
                    <span>{category.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* Desktop Category Tabs */}
        <div className="hidden lg:flex justify-center mb-6 space-x-4">
          {scholarshipFaqData.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                activeCategory === index 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {category.icon}
              <span>{category.category}</span>
            </button>
          ))}
        </div>
  
        {/* FAQs */}
        <div className="space-y-4">
          {currentCategoryFaqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg border transition-all ${
                openFaqIndex === index 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-3 sm:p-4 flex items-center justify-between"
              >
                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                  {faq.question}
                </span>
                {openFaqIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              
              {openFaqIndex === index && (
                <div className="p-3 sm:p-4 pt-0 text-gray-600">
                  <pre className="font-sans whitespace-pre-wrap text-xs sm:text-sm">
                    {faq.answer}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
  
        <div className="mt-6 sm:mt-8 text-center">
          <Button 
        //   onClick={()=>message.success("comming soon!")}
            type="primary" 
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            <Link
          to='/book-meeting'>
            Still Have Questions? Schedule a meeting
            </Link>
          </Button>
        </div>
      </div>
    );
  }