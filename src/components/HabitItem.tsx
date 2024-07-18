import React, { useState } from "react";

interface HabitItemProps {
  habit: {
    id: number;
    name: string;
    category: string;
    completed: Record<string, boolean>;
    active: boolean;
  };
  toggleHabit: (habitId: number, dateKey: string) => void;
  toggleActive: (habitId: number) => void;
  updateHabit: (habitId: number, name: string, category: string) => void;
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

  const handleUpdate = () => {
    updateHabit(habit.id, name, category);
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
    <div className="mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded mr-2"
          >
            <option value="Work">Work</option>
            <option value="Health">Health</option>
            <option value="Hobby">Hobby</option>
          </select>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="border border-gray-200 rounded overflow-hidden shadow-lg p-2 dark:bg-gray-800 dark:border-gray-700 ">
          <h2 className="bg-blue-100 border-t text-xl font-semibold p-2 border-b border-blue-500 text-blue-700 font-bold">
            {habit.name}
          </h2>
          <div className="flex space-x-2 p-2">
            {dateKeys.map((dateKey, index) => (
              <div
                key={dateKey}
                className={`w-fit h-fit border-2 p-1 ${
                  habit.completed[dateKey] ? "bg-green-500" : "bg-red-500"
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
            className={`m-2 p-2 ${
              habit.active ? "bg-red-500" : "bg-green-500"
            } text-white rounded-full`}
            onClick={() => toggleActive(habit.id)}
          >
            {habit.active ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="m-2 p-2 bg-yellow-500 text-white rounded-full"
          >
            Edit
          </button>
          <button
            onClick={() => deleteHabit(habit.id)}
            className="m-2 p-2 bg-red-500 text-white rounded-full"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HabitItem;
