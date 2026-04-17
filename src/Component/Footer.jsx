import React from "react";
import Logo from "./Logo";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-10">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Logo + Description */}
        <div>
          <Logo />
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Fast, secure and reliable parcel delivery system. 
            We make your logistics simple and efficient.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-xl">
            <a className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>
            <a className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
            <a className="hover:text-gray-100 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h6 className="text-white font-semibold mb-4">Services</h6>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-amber-400 cursor-pointer">Parcel Delivery</li>
            <li className="hover:text-amber-400 cursor-pointer">Express Shipping</li>
            <li className="hover:text-amber-400 cursor-pointer">Tracking System</li>
            <li className="hover:text-amber-400 cursor-pointer">Cash On Delivery</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="text-white font-semibold mb-4">Company</h6>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-amber-400 cursor-pointer">About Us</li>
            <li className="hover:text-amber-400 cursor-pointer">Contact</li>
            <li className="hover:text-amber-400 cursor-pointer">Careers</li>
            <li className="hover:text-amber-400 cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h6 className="text-white font-semibold mb-4">Subscribe</h6>
          <p className="text-sm text-gray-400 mb-3">
            Get latest updates and offers.
          </p>

          <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-transparent outline-none text-sm w-full"
            />
            <button className="bg-amber-500 px-4 py-2 text-white text-sm hover:bg-amber-600 transition">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} All rights reserved — Your Company 🚀
      </div>
    </footer>
  );
};

export default Footer;