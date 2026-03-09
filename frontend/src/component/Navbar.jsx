import React, { useState, useEffect, useContext } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom"; // Import NavLink
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const menuItems = [
    { label: "Home", path: "/" },
    // { label: "Categories", path: "/categories" },
    { label: "Explore", path: "/explore" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Navigate to homepage after logout
  };

  // Helper function for NavLink's className to apply active styles
  const getNavLinkClass = ({ isActive }) =>
    `font-medium hover:text-orange-500 transition-colors text-gray-700 ${
      isActive ? "border-b-2 border-orange-500 pb-1" : "order-b-2"
    }`; // Underline for active state

  // Helper function for mobile NavLink's className
  const getMobileNavLinkClass = ({ isActive }) =>
    `font-medium text-gray-700 hover:text-orange-500 transition-colors py-2 ${
      isActive ? "border-b-2 border-orange-500" : ""
    }`; // Underline for active state

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-2"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <MapPin className="text-white" size={18} />
          </div>
          <span
            className="text-xl font-bold text-orange-500"
          >
            Argan
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={getNavLinkClass} // Use the helper function for styling
            >
              {item.label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <>
              {/* This is a button-style link, so no underline for active state */}

              {user.userType === "business" && (
                <Link to="/register-business">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full font-medium transition-colors">
                    Add Business
                  </button>
                </Link>
              )}

              {user.userType === "business" && (
                <Link to="/business-dashboard">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full font-medium transition-colors">
                    Dashboard
                  </button>
                </Link>
              )}

                            <button
                              onClick={handleLogout}
                              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 shadow-md"
                            >
                              Logout
                            </button>            </>
          ) : (
            // This is a button-style link, so no underline for active state
            <Link to="/sing-up">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-colors">
                Login / Signup
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="text-gray-800" />
          ) : (
            <Menu className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={getMobileNavLinkClass} // Use the helper function for mobile styling
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {item.label}
              </NavLink>
            ))}

            {isLoggedIn ? (
              <>
                {user.userType === "business" && (
                  <Link to="/register-business">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full font-medium transition-colors">
                      Add Business
                    </button>
                  </Link>
                )}
                {user.userType === "business" && (
                  <Link to="/business-dashboard">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded-full font-medium transition-colors">
                      Dashboard
                    </button>
                  </Link>
                )}

                                <button
                                  onClick={handleLogout}
                                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 shadow-md"
                                >
                                  Logout
                                </button>              </>
            ) : (
              <Link to="/sing-up">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
                >
                  Login / Signup
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
