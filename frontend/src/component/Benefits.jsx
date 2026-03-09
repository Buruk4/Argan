import React from "react";
import { Search, CheckCircle, Heart, MapPin } from "lucide-react";

const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 text-orange-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Benefits = () => {
  const benefits = [
    {
      icon: <Search size={24} />,
      title: "Fast and Easy Discovery",
      description:
        "Find exactly what you're looking for in seconds with our powerful search and filtering options.",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Trusted and Verified",
      description:
        "All businesses are verified and reviewed by our community to ensure quality and authenticity.",
    },
    {
      icon: <Heart size={24} />,
      title: "Support Local Businesses",
      description:
        "Discover and support local entrepreneurs and businesses in your community.",
    },
    {
      icon: <MapPin size={24} />,
      title: "Personalized Suggestions",
      description:
        "Get tailored recommendations based on your location, preferences, and previous visits.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Use Argan?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how Argan makes finding the best places easier than ever
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
