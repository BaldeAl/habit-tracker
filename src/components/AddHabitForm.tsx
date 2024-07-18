import React, { useState } from "react";

interface AddHabitFormProps {
  addHabit: (name: string, category: string) => void;
  categories: string[];
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({
  addHabit,
  categories,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addHabit(name, category);
      setName("");
      setCategory(categories[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter habit name"
        className="border p-2 rounded mr-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded mr-2"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-full">
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;
