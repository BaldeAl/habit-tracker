import React, { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import CategoryFilter from "./components/CategoryFilter";
import PeriodSelector from "./components/PeriodSelector";
import HabitStatistics from "./components/HabitStatistics";
import CalendarComponent from "./components/Calendar";
import BadgeCustomization from "./components/BadgeCustomization";
import Notifications, { notify } from "./components/Notifications";

interface Habit {
  id: number;
  name: string;
  category: string;
  color: string;
  completed: Record<string, boolean>;
  active: boolean;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [categories, setCategories] = useState<string[]>([
    "All",
    "Work",
    "Health",
    "Hobby",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState<string>("Day"); // Day, Week, Month
  const [badgeColor, setBadgeColor] = useState<string>("#00ff00"); // Default color

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string, category: string, color: string) => {
    const newHabit = {
      id: Date.now(),
      name,
      category,
      color,
      completed: {},
      active: true,
    };
    setHabits([...habits, newHabit]);
    notify("Habit added successfully!");
  };

  const toggleHabit = (habitId: number, dateKey: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const updatedCompleted = { ...habit.completed };
          updatedCompleted[dateKey] = !updatedCompleted[dateKey];
          notify(
            `Habit ${
              updatedCompleted[dateKey] ? "completed" : "uncompleted"
            } on ${dateKey}`
          );
          return { ...habit, completed: updatedCompleted };
        }
        return habit;
      })
    );
  };

  const toggleActive = (habitId: number) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const updatedHabit = { ...habit, active: !habit.active };
          notify(`Habit ${updatedHabit.active ? "activated" : "deactivated"}`);
          return updatedHabit;
        }
        return habit;
      })
    );
  };

  const updateHabit = (
    habitId: number,
    name: string,
    category: string,
    color: string
  ) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          notify("Habit updated successfully!");
          return { ...habit, name, category, color };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (habitId: number) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
    notify("Habit deleted successfully!");
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  const filteredHabits =
    selectedCategory === "All"
      ? habits
      : habits.filter((habit) => habit.category === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Habit Tracker</h1>
      <div className="mb-4 p-4 bg-white shadow rounded-lg">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <PeriodSelector
          period={period}
          setPeriod={handlePeriodChange}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <CalendarComponent
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <BadgeCustomization
          badgeColor={badgeColor}
          setBadgeColor={setBadgeColor}
        />
        <AddHabitForm addHabit={addHabit} categories={categories} />
      </div>
      <div className="mb-4 p-4 bg-white shadow rounded-lg">
        <HabitStatistics
          habits={filteredHabits}
          period={period}
          currentDate={currentDate}
        />
      </div>
      <div className="mb-4 p-4 bg-white shadow rounded-lg">
        <HabitList
          habits={filteredHabits}
          toggleHabit={toggleHabit}
          toggleActive={toggleActive}
          updateHabit={updateHabit}
          deleteHabit={deleteHabit}
          period={period}
          currentDate={currentDate}
        />
      </div>
      <Notifications />
    </div>
  );
};

export default HabitTracker;
