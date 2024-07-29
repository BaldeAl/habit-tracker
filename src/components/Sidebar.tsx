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
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 shadow-md transition-transform transform z-10 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>
      <ul className="mt-10">
        <li className="relative">
          <Link
            to="/"
            className="block py-4 px-6 hover:bg-gray-700 flex items-center"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
        </li>
        <li className="relative">
          <a
            href="#habits"
            className="block py-4 px-6 hover:bg-gray-700 flex items-center"
          >
            <FaTasks className="mr-2" />
            Habits
          </a>
        </li>
        <li className="relative">
          <a
            href="#statistics"
            className="block py-4 px-6 hover:bg-gray-700 flex items-center"
          >
            <FaChartBar className="mr-2" />
            Statistics
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
