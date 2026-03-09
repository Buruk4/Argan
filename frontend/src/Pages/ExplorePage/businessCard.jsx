import React from "react";
import { Star, MapPin, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
const BusinessCard = ({ business }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={business.photos[0]}
          alt={business.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {business.openNow && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
            <Clock size={12} className="mr-1" />
            Open Now
          </div>
        )}
        {business.featured && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {business.name}
          </h3>
          <div className="flex items-center text-sm">
            <Star className="text-yellow-400 mr-1" size={16} fill="#FACC15" />
            <span className="font-medium">{business.rating}</span>
            {/* <span className="text-gray-500 ml-1">({business.reviewCount})</span> */}
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-3 line-clamp-1">
          {business.category}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          <span>
            {business.distance > 1
              ? business.distance.toFixed(2) + " KM"
              : business.distance.toFixed(2) * 1000 + " M"}
          </span>
        </div>

        <button className="w-full bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
          <ExternalLink size={14} />
          <Link to={`/business-details/${business._id}`}> View Details</Link>
        </button>
      </div>
    </div>
  );
};
export default BusinessCard;
