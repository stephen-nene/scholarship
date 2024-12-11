import React from "react";
import { 
  FcAcceptDatabase, 
  FcStatistics, 
  FcWorkflow, 
  FcOnlineSupport 
} from "react-icons/fc";

// Feature card component for reusability
const FeatureCard = ({ Icon, title, description }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
    <div className="p-8">
      <div className="flex items-center gap-3">
        <Icon className="mb-6 text-4xl" />
        <h3 className="text-gray-800 text-xl font-semibold mb-3">
          {title}
        </h3>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

// Features data for easy maintenance and scalability
const FEATURES = [
  {
    Icon: FcAcceptDatabase,
    title: "Comprehensive Resources",
    description: "We provide a wealth of resources, including application guides and financial literacy tools."
  },
  {
    Icon: FcStatistics,
    title: "High Success Rates",
    description: "Our track record shows a high percentage of applicants receiving funding, committed to helping students achieve their educational aspirations."
  },
  {
    Icon: FcWorkflow,
    title: "User-Friendly Application",
    description: "Our streamlined application process ensures that students can apply easily and efficiently."
  },
  {
    Icon: FcOnlineSupport,
    title: "Community Engagement",
    description: "We offer workshops and informational sessions to guide students through the scholarship application process."
  }
];

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="mb-16">
        <h2 className="text-4xl font-extrabold mb-4">Why Choose Us</h2>
        <p className="text-gray-600">
          Our unique features combine our expertise, proven track record, and commitment to providing personalized, effective solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:max-w-md mx-auto">
        {FEATURES.map((feature, index) => (
          <FeatureCard 
            key={index}
            Icon={feature.Icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}