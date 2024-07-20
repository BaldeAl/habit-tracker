import React, { useState } from "react";

interface AddHabitFormProps {
  addHabit: (name: string, category: string, color: string) => void;
  categories: string[];
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({
  addHabit,
  categories,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [color, setColor] = useState("#00ff00"); // Default color

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addHabit(name, category, color);
      setName("");
      setCategory(categories[0]);
      setColor("#00ff00");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" aria-label="Add new habit">
      <label htmlFor="habit-name" className="sr-only">
        Habit Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter habit name"
        className="border p-2 rounded mr-2"
        aria-required="true"
      />
      <label htmlFor="habit-category" className="sr-only">
        Category
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded mr-2"
        aria-required="true"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label htmlFor="habit-color" className="sr-only">
        Color
      </label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;
