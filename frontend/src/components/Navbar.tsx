import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/ai.png";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  // State to manAge the Navbar visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0 w-2/3" : "-translate-x-full"}
           md:translate-x-0 md:w-64 bg-gray-800 text-white md:bg-gray-800 md:text-white`}
      >
        {/* Close button (mobile) */}
        <button
          className="absolute top-4 right-4 md:hidden p-2 text-white bg-gray-700"
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
          <p className="flex items-center justify-evenly mb-4">
            <img src={Logo} height={40} width={40} />
            <h1 className="text-2xl text-indigo-400"> Doc Talk Decode</h1>
          </p>
          <hr />
          <ul className="mt-2">
            <li>
              <Link
                onClick={async () => {
                  const response = await axios.get(
                    "http://127.0.0.1:8000/exit"
                  );
                  console.log(response.data);
                }}
                to="/"
                className={`block px-4 py-2 text-xl hover:bg-indigo-600 hover:text-white rounded ${
                  pathname === "/" ? "bg-indigo-600 text-white rounded" : ""
                }  
                  `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/past"
                className={`block px-4 py-2 text-xl hover:bg-indigo-600 hover:text-white rounded
                  ${
                    pathname === "/past"
                      ? "bg-indigo-600 text-white rounded"
                      : ""
                  }
                  `}
              >
                Past-Documents
              </Link>
            </li>
            <li>
              <Link
                to="/camera"
                className={`block px-4 py-2 text-xl  hover:bg-indigo-600 hover:text-white rounded
                  ${
                    pathname === "/camera"
                      ? "bg-indigo-600 text-white rounded"
                      : ""
                  }
                  `}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Toggle button (mobile) */}
        <button className="md:hidden p-2 text-white" onClick={toggleSidebar}>
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
