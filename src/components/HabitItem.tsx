import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaCheck,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import StyledButton from "./StyledButton";

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
    <div
      className={`p-4 bg-white shadow rounded-lg transition-transform transform hover:scale-105 ${
        !habit.active ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <div className="mb-4">
          <label htmlFor="edit-habit-name" className="sr-only">
            Edit Habit Name
          </label>
          <input
            id="edit-habit-name"
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
            id="edit-habit-category"
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
            id="edit-habit-color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <StyledButton onClick={handleUpdate} className="mr-2">
            <FaCheck />
          </StyledButton>
          <StyledButton
            onClick={() => setIsEditing(false)}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-600"
          >
            <FaTimes />
          </StyledButton>
        </div>
      ) : (
        <div>
          <div
            className="h-1 mb-2"
            style={{ backgroundColor: habit.color }}
          ></div>
          <h2 className="text-xl font-semibold mb-2">{habit.name}</h2>
          <div className="flex space-x-1 mb-2">
            {dateKeys.map((dateKey, index) => (
              <div
                key={dateKey}
                className={`w-6 h-6 border-2 ${
                  habit.completed[dateKey] ? habit.color : "bg-gray-200"
                } cursor-pointer ${!habit.active ? "pointer-events-none" : ""}`}
                onClick={() => toggleHabit(habit.id, dateKey)}
                title={
                  period === "Week"
                    ? dayNames[index]
                    : period === "Month"
                    ? new Date(dateKey).getDate().toString()
                    : ""
                }
              />
            ))}
          </div>
          <StyledButton
            onClick={() => toggleActive(habit.id)}
            className={`mt-2 ${
              habit.active
                ? "bg-red-500 hover:bg-red-600 focus:ring-red-600"
                : "bg-green-500 hover:bg-green-600 focus:ring-green-600"
            }`}
          >
            {habit.active ? <FaToggleOff /> : <FaToggleOn />}
          </StyledButton>
          <StyledButton
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-600"
          >
            <FaEdit />
          </StyledButton>
          <StyledButton
            onClick={() => deleteHabit(habit.id)}
            className="mt-2 bg-red-500 hover:bg-red-600 focus:ring-red-600"
          >
            <FaTrashAlt />
          </StyledButton>
        </div>
      )}
    </div>
  );
};

export default HabitItem;
