import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>

      <div className="flex text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < testimonial.rating ? "#FACC15" : "none"}
            stroke={i < testimonial.rating ? "#FACC15" : "#D1D5DB"}
          />
        ))}
      </div>

      <p className="text-gray-600 italic flex-grow">"{testimonial.text}"</p>

      <p className="text-sm text-gray-500 mt-4">
        About{" "}
        <span className="text-orange-500 font-medium">
          {testimonial.businessName}
        </span>
      </p>
    </div>
  );
};

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      text: "Argan helped me find the best café in minutes! The reviews were spot on and I discovered my new favorite brunch spot.",
      businessName: "The Urban Café",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Michael Chen",
      location: "San Francisco, CA",
      rating: 5,
      text: "As a foodie, I'm always looking for new restaurants to try. Argan's recommendations have never disappointed me!",
      businessName: "Pasta Paradise",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      rating: 4,
      text: "I was new to the area and needed to find services quickly. Argan made it so easy to find everything from grocery stores to gyms.",
      businessName: "Fitness Center Pro",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "James Wilson",
      location: "Austin, TX",
      rating: 5,
      text: "As a business owner, getting listed on Argan has brought in so many new customers. The platform is intuitive and effective.",
      businessName: "Green Market",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.ceil(testimonials.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1
    );
  };

  // For mobile, show 1 testimonial at a time
  // For tablet, show 2 testimonials at a time
  // For desktop, show 3 testimonials at a time
  const getVisibleTestimonials = () => {
    // This is a simplified version - in a real app, we'd use useEffect with window.innerWidth
    return testimonials;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from people who have discovered amazing places with
            Argan
          </p>
        </div>

        <div className="relative">
          {/* Desktop and Tablet View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* Mobile View with Carousel */}
          <div className="md:hidden">
            <TestimonialCard testimonial={testimonials[currentSlide]} />

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-orange-500" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Carousel Controls - Mobile Only */}
          <button
            className="md:hidden absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <button
            className="md:hidden absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md"
            onClick={nextSlide}
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
