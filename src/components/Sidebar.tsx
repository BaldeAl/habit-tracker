// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaChartBar, FaCog } from "react-icons/fa";

interface SidebarProps {
  visible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ visible }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 shadow-md transition-transform transform ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="mt-10">
        <li className="relative">
          <Link
            to="/"
            className="block py-4 px-6 hover:bg-gray-700 flex items-center"
          >
            <FaHome className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="relative">
          <Link
            to="/habits"
            className="block py-4 px-6 hover:bg-gray-700 flex items-center"
          >
            <FaTasks className="mr-2" />
            Habits
          </Link>
        </li>
        <li className="relative">
          <Link
            to="/statistics"
            className="block py-4 px-6 hover:bg-gray-700 flex items-center"
          >
            <FaChartBar className="mr-2" />
            Statistics
          </Link>
        </li>
        <li className="relative">
          <Link
            to="/settings"
            className="block py-4 px-6 hover:bg-gray-700 flex items-center"
          >
            <FaCog className="mr-2" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
