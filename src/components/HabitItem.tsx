import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaCheck,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

interface HabitItemProps {
  habit: {
    id: number;
    name: string;
    category: string;
    color: string;
    completed: Record<string, boolean>;
    active: boolean;
  };
  toggleHabit: (habitId: number, dateKey: string) => void;
  toggleActive: (habitId: number) => void;
  updateHabit: (
    habitId: number,
    name: string,
    category: string,
    color: string
  ) => void;
  deleteHabit: (habitId: number) => void;
  dateKeys: string[];
  period: string;
}

const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  toggleHabit,
  toggleActive,
  updateHabit,
  deleteHabit,
  dateKeys,
  period,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(habit.name);
  const [category, setCategory] = useState(habit.category);
  const [color, setColor] = useState(habit.color);

  const handleUpdate = () => {
    updateHabit(habit.id, name, category, color);
    setIsEditing(false);
  };

  const getDayNames = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getMonthNames = () => [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = getDayNames();
  const monthNames = getMonthNames();

  return (
    <div className="mb-4 p-4 bg-white shadow rounded-lg transition-transform transform hover:scale-105">
      {isEditing ? (
        <div className="mb-4">
          <label htmlFor="edit-habit-name" className="sr-only">
            Edit Habit Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded mr-2"
            aria-required="true"
          />
          <label htmlFor="edit-habit-category" className="sr-only">
            Edit Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded mr-2"
            aria-required="true"
          >
            <option value="Work">Work</option>
            <option value="Health">Health</option>
            <option value="Hobby">Hobby</option>
          </select>

          <label htmlFor="edit-habit-color" className="sr-only">
            Edit Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <FaCheck />
            Save
          </button>
        </div>
      ) : (
        <div>
          <div
            className="h-1 mb-2"
            style={{ backgroundColor: habit.color }}
          ></div>
          <h2 className="text-xl font-semibold mb-2">{habit.name}</h2>
          <div className="flex  space-x-3 mb-2">
            {dateKeys.map((dateKey, index) => (
              <div
                key={dateKey}
                className={`w-6 h-6 border-2 ${
                  habit.completed[dateKey] ? habit.color : "bg-gray-200"
                } cursor-pointer`}
                onClick={() => toggleHabit(habit.id, dateKey)}
              >
                {period === "Week"
                  ? dayNames[index]
                  : period === "Month"
                  ? new Date(dateKey).getDate()
                  : ""}
              </div>
            ))}
          </div>
          <button
            className={`mt-2 p-2 ${
              habit.active ? "bg-red-500" : "bg-green-500"
            } text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600`}
            onClick={() => toggleActive(habit.id)}
          >
            {habit.active ? (
              <div className="flex ">
                Deactivate <FaToggleOff />
              </div>
            ) : (
              <span className="flex">
                Activate <FaToggleOn />
              </span>
            )}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={() => deleteHabit(habit.id)}
            className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <FaTrashAlt />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HabitItem;
