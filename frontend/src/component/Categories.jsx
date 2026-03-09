import React from "react";
import {
  Utensils,
  ShoppingCart,
  Coffee,
  Hotel,
  Scissors,
  Dumbbell,
  Heart,
  Car,
} from "lucide-react";

const CategoryCard = ({ icon, name, count, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
      <div className="p-6 flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500">{count} places</p>
      </div>
    </div>
  );
};

const Categories = () => {
  const categories = [
    {
      icon: <Utensils className="text-white" size={24} />,
      name: "Restaurants",
      count: 1240,
      color: "bg-orange-500",
    },
    {
      icon: <Coffee className="text-white" size={24} />,
      name: "Cafés",
      count: 865,
      color: "bg-orange-400",
    },
    {
      icon: <ShoppingCart className="text-white" size={24} />,
      name: "Groceries",
      count: 620,
      color: "bg-orange-500",
    },
    {
      icon: <Hotel className="text-white" size={24} />,
      name: "Hotels",
      count: 345,
      color: "bg-orange-400",
    },
    {
      icon: <Scissors className="text-white" size={24} />,
      name: "Salons",
      count: 530,
      color: "bg-orange-500",
    },
    {
      icon: <Dumbbell className="text-white" size={24} />,
      name: "Gyms",
      count: 280,
      color: "bg-orange-400",
    },
    {
      icon: <Heart className="text-white" size={24} />,
      name: "Healthcare",
      count: 420,
      color: "bg-orange-500",
    },
    {
      icon: <Car className="text-white" size={24} />,
      name: "Auto Services",
      count: 320,
      color: "bg-orange-400",
    },
  ];

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our popular categories and find exactly what you're looking
            for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              name={category.name}
              count={category.count}
              color={category.color}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
