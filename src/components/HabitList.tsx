import React from "react";
import HabitItem from "./HabitItem";

interface HabitListProps {
  habits: {
    id: number;
    name: string;
    category: string;
    completed: Record<string, boolean>;
    active: boolean;
  }[];
  toggleHabit: (habitId: number, dateKey: string) => void;
  toggleActive: (habitId: number) => void;
  updateHabit: (habitId: number, name: string, category: string) => void;
  deleteHabit: (habitId: number) => void;
  period: string;
  currentDate: Date;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  toggleHabit,
  toggleActive,
  updateHabit,
  deleteHabit,
  period,
  currentDate,
}) => {
  const generateDateKeys = () => {
    const keys = [];
    const date = new Date(currentDate);
    if (period === "Day") {
      keys.push(date.toISOString().split("T")[0]);
    } else if (period === "Week") {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      const startOfWeek = new Date(date.setDate(diff));
      for (let i = 0; i < 7; i++) {
        keys.push(new Date(startOfWeek).toISOString().split("T")[0]);
        startOfWeek.setDate(startOfWeek.getDate() + 1);
      }
    } else if (period === "Month") {
      const year = date.getFullYear();
      const month = date.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        keys.push(new Date(year, month, i).toISOString().split("T")[0]);
      }
    }
    return keys;
  };

  const dateKeys = generateDateKeys();

  return (
    <div>
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          toggleHabit={toggleHabit}
          toggleActive={toggleActive}
          updateHabit={updateHabit}
          deleteHabit={deleteHabit}
          dateKeys={dateKeys}
          period={period}
        />
      ))}
    </div>
  );
};

export default HabitList;
