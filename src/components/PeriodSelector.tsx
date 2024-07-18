import React from "react";

interface PeriodSelectorProps {
  period: string;
  setPeriod: (period: string) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

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

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  period,
  setPeriod,
  currentDate,
  setCurrentDate,
}) => {
  const dayNames = getDayNames();
  const monthNames = getMonthNames();

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (period === "Day") newDate.setDate(currentDate.getDate() - 1);
    if (period === "Week") newDate.setDate(currentDate.getDate() - 7);
    if (period === "Month") newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (period === "Day") newDate.setDate(currentDate.getDate() + 1);
    if (period === "Week") newDate.setDate(currentDate.getDate() + 7);
    if (period === "Month") newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(parseInt(e.target.value, 10));
    setCurrentDate(newDate);
  };

  const years = Array.from(
    { length: 10 },
    (_, i) => currentDate.getFullYear() - 5 + i
  );

  return (
    <div className="mb-4">
      <button
        onClick={handlePrev}
        className="mr-2 p-2 bg-gray-300 rounded-full"
      >
        Prev
      </button>
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="border p-2 rounded mr-2"
      >
        <option value="Day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
      </select>
      <select
        value={currentDate.getFullYear()}
        onChange={handleYearChange}
        className="border p-2 rounded mr-2"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button
        onClick={handleNext}
        className="ml-2 p-2 bg-gray-300 rounded-full"
      >
        Next
      </button>
      <div>
        {period === "Day" && <div>{dayNames[currentDate.getDay()]}</div>}
        {period === "Month" && <div>{monthNames[currentDate.getMonth()]}</div>}
      </div>
    </div>
  );
};

export default PeriodSelector;
