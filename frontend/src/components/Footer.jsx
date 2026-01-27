import React from "react";
import { Link } from "react-router-dom";
import { Home, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-bold mb-4">
            <Home />
            EstateHub
          </div>
          <p className="text-sm text-gray-400">
            A modern real estate platform to explore properties, book visits,
            and manage listings seamlessly.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-white">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login / Signup
              </Link>
            </li>
            <li>
              <Link to="/addListing" className="hover:text-white">
                Add Listing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Explore Cities</h4>
          <ul className="space-y-2 text-sm">
            <li>Vijayawada</li>
            <li>Visakhapatnam</li>
            <li>Guntur</li>
            <li>Tirupati</li>
            <li>Amaravati</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@estatehub.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Andhra Pradesh, India
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EstateHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
