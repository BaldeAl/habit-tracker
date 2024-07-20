import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HabitTracker from "./HabitTracker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Settings from "./components/Setting";
import { FaBars } from "react-icons/fa";

const App: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar visible={sidebarVisible} />
        <div
          className={`flex-1 transition-transform ${
            sidebarVisible ? "ml-64" : "ml-0"
          }`}
        >
          <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
            >
              <FaBars />
            </button>
            <h1 className="text-xl">Habit Tracker</h1>
          </header>
          <div className="p-4">
            <Routes>
              <Route path="/" element={<HabitTracker />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
