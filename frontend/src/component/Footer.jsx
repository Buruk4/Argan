import React, { useContext } from "react";
import { MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { UserContext } from "../context/UserContext";

const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <MapPin className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold text-white">Argan</span>
            </div>
            <p className="text-gray-400 mb-4">
              Helping you discover the best places around you, all in one
              platform.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#businesses"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Popular Places
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          {/* For Businesses */}
          {console.log(user?.userType)}
          {user && user?.userType === "business" ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">For Businesses</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Add Your Business
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Business Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Advertising
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Business Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
          ) : null}
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: contact@argan.com</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-400">123 Business Ave, Suite 100</li>
              <li className="text-gray-400">San Francisco, CA 94107</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Argan. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
