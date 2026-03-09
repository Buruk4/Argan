import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import hereImg from "../assets/Hero.jpg";
import { Link } from "react-router-dom";
const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${hereImg})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/80"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Find the Best Places Near You with{" "}
            <span className="text-orange-500">Argan</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fadeInDelay">
            Discover top-rated restaurants, cafés, stores, and services in your
            area
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-lg flex items-center mb-8 mx-auto max-w-2xl animate-scaleIn">
            <div className="flex items-center gap-2 px-4 text-gray-500">
              <Search size={20} />
            </div>

            <input
              type="text"
              placeholder="Search for restaurants, cafés, hotels..."
              className="flex-grow py-2 px-2 text-gray-800 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 flex items-center gap-2">
              <MapPin size={16} className="hidden md:block" />
              <span className="hidden md:block">Search Now</span>
              <Search size={12} className="block md:hidden" />
            </button>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInDelay2">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 w-full sm:w-auto">
              <Link to="/explore">Explore Now</Link>
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border border-white py-3 px-8 rounded-full font-medium transition-all duration-300 w-full sm:w-auto">
              Register Your Business
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
