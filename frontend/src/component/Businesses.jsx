import React from "react";
import { Star, MapPin, Clock, ExternalLink } from "lucide-react";

const BusinessCard = ({ business }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={business.image}
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
            <span className="text-gray-500 ml-1">({business.reviewCount})</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-3 line-clamp-1">
          {business.category}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          <span>{business.distance}</span>
        </div>

        <button className="w-full bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
          <ExternalLink size={14} />
          View Details
        </button>
      </div>
    </div>
  );
};

const Businesses = () => {
  const businesses = [
    {
      name: "The Urban Café",
      category: "Café • Coffee • Breakfast",
      rating: 4.8,
      reviewCount: 324,
      distance: "1.2 miles away",
      image:
        "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      openNow: true,
      featured: true,
    },
    {
      name: "Pasta Paradise",
      category: "Italian • Pasta • Wine",
      rating: 4.6,
      reviewCount: 215,
      distance: "0.8 miles away",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      openNow: true,
      featured: false,
    },
    {
      name: "Green Market",
      category: "Grocery • Organic • Local",
      rating: 4.7,
      reviewCount: 189,
      distance: "1.5 miles away",
      image:
        "https://images.pexels.com/photos/1508666/pexels-photo-1508666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      openNow: true,
      featured: false,
    },
    {
      name: "Sunset Hotel",
      category: "Hotel • Luxury • Pool",
      rating: 4.9,
      reviewCount: 432,
      distance: "2.1 miles away",
      image:
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      openNow: true,
      featured: true,
    },
    {
      name: "Fitness Center Pro",
      category: "Gym • Fitness • Classes",
      rating: 4.5,
      reviewCount: 156,
      distance: "0.6 miles away",
      image:
        "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      openNow: false,
      featured: false,
    },
    {
      name: "Beachside Grill",
      category: "Seafood • Grill • Outdoor",
      rating: 4.7,
      reviewCount: 287,
      distance: "1.9 miles away",
      image:
        "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      openNow: true,
      featured: false,
    },
  ];

  return (
    <section id="businesses" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Popular Businesses Near You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-rated businesses in your area based on reviews and
            ratings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business, index) => (
            <BusinessCard key={index} business={business} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300">
            Show More Places
          </button>
        </div>
      </div>
    </section>
  );
};

export default Businesses;
