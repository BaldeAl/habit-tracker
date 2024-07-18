import React, { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import CategoryFilter from "./components/CategoryFilter";
import PeriodSelector from "./components/PeriodSelector";
import HabitStatistics from "./components/HabitStatistics";

interface Habit {
  id: number;
  name: string;
  category: string;
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

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string, category: string) => {
    const newHabit = {
      id: Date.now(),
      name,
      category,
      completed: {},
      active: true,
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (habitId: number, dateKey: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const updatedCompleted = { ...habit.completed };
          updatedCompleted[dateKey] = !updatedCompleted[dateKey];
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
          return { ...habit, active: !habit.active };
        }
        return habit;
      })
    );
  };

  const updateHabit = (habitId: number, name: string, category: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          return { ...habit, name, category };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (habitId: number) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
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
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
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
      <AddHabitForm addHabit={addHabit} categories={categories} />
      <HabitStatistics
        habits={filteredHabits}
        period={period}
        currentDate={currentDate}
      />
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
  );
};

export default HabitTracker;
