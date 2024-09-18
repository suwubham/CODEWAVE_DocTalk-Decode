import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  // State to manAge the Navbar visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const message = [
    {
      role: "system",
      content: [
        {
          type: "text",
          text: "You are a virtual doctor whose role is to explain medical diagnoses and health reports in simple, everyday language. Imagine you are speaking to someone with no medical knowledge. Break down any complex terms, and explain everything in a single paragraph, using examples or analogies that a layperson can relate to. Make sure your explanation is clear, concise, and reassuring, so the person understands their health condition without feeling overwhelmed. Also, offer suggestions on what the person can do next in terms of lifestyle changes or treatments, if appropriate. write it in a paragraph",
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: "https://firebasestorage.googleapis.com/v0/b/codewave-hackathon.appspot.com/o/files%2Ftest4.jpg?alt=media&token=3a566c87-2b0b-48bc-9676-2aaea917b6ad",
            detail: "high",
          },
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "text",
          text: "The abdominal scan report indicates that most of your organs, including the liver, gallbladder, pancreas, spleen, kidneys, and bladder, are normal in size and appearance, which is a good sign. There are no significant issues like stones or lesions in these organs. However, it mentions a small amount of fluid in the right lower abdomen, which could be related to mild inflammation in the area. The report suggests that there is no clear indication of appendicitis, but it recommends further evaluation if symptoms persist. It's important to follow up with your doctor to discuss these findings and determine if any additional tests or treatments are necessary. Staying hydrated and maintaining a balanced diet can also support your overall health.",
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "help me know more about staying hydrated",
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "text",
          text: "Staying hydrated means drinking enough fluids to keep your body functioning well. Water is essential for many bodily functions, including regulating temperature, keeping joints lubricated, and helping organs work properly. A good rule of thumb is to aim for about 8 cups (64 ounces) of water a day, but this can vary based on factors like your activity level, climate, and overall health.\n\nTo stay hydrated, try these tips:\n\n1. **Drink Water Regularly**: Carry a water bottle with you and take sips throughout the day.\n2. **Eat Water-Rich Foods**: Foods like fruits (watermelon, oranges) and vegetables (cucumbers, lettuce) can contribute to your hydration.\n3. **Set Reminders**: Use your phone or apps to remind you to drink water at regular intervals.\n4. **Flavor Your Water**: If plain water is boring, add slices of lemon, cucumber, or berries for a refreshing taste.\n5. **Monitor Your Urine**: A light yellow color usually indicates good hydration, while dark yellow suggests you need more fluids.\n\nRemember, if you're exercising or in hot weather, you may need to drink more to replace lost fluids. Staying hydrated helps you feel better and supports your overall health!",
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "thanks that will be all",
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "text",
          text: "You're welcome! If you have any more questions in the future, feel free to ask. Take care!",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-350 top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 w-2/3" : "-translate-x-full"
        } md:translate-x-0 md:w-64 bg-gray-800 text-white md:bg-gray-300 md:text-gray-800`}
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
              <Link
                to="/"
                className={`block px-4 py-2 hover:bg-indigo-600 hover:text-white rounded ${
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
                className={`block px-4 py-2 hover:bg-indigo-600 hover:text-white rounded
                  ${
                    pathname === "/past"
                      ? "bg-indigo-600 text-white rounded"
                      : ""
                  }
                  `}
              >
                Past Documents
              </Link>
            </li>
            <li>
              <Link
                to="/camera"
                className={`block px-4 py-2 hover:bg-indigo-600 hover:text-white rounded
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
            <li>
              <Link to="/chat" state={message}>
                Go to Chat
              </Link>
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
