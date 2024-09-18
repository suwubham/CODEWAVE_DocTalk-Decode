import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  // State to manage the Navbar visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div
        className={`fixed inset-0 top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 w-2/3" : "-translate-x-full"
        } md:translate-x-0 md:w-64 bg-gray-800 text-white md:bg-white md:text-gray-800`}
      >
        {/* Close button (mobile) */}
        <button
          className="absolute top-4 right-4 md:hidden p-2 text-white"
          onClick={toggleSidebar}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        <div className="p-4">
          <h1 className="text-xl font-semibold mb-4">APP NAME</h1>
          <ul>
            <li>
              <Link to="/" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link to="/past" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Past Documents
              </Link>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Toggle button (mobile) */}
        <button className="md:hidden p-2 text-gray-800" onClick={toggleSidebar}>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
