import React from "react";
import { Search, Building } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Amazing Places?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of people finding the best local businesses every day
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-orange-600 hover:bg-gray-100 py-3 px-8 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2">
              <Search size={18} />
              <span>Start Exploring</span>
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white py-3 px-8 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2">
              <Building size={18} />
              <span>Add Your Business</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
