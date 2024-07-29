import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface HabitStatisticsProps {
  habits: {
    id: number;
    name: string;
    category: string;
    color: string;
    completed: Record<string, boolean>;
    active: boolean;
  }[];
  period: string;
  currentDate: Date;
}

const HabitStatistics: React.FC<HabitStatisticsProps> = ({
  habits,
  period,
  currentDate,
}) => {
  const [chartType, setChartType] = useState<string>("bar");

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

  const data = {
    labels: dateKeys,
    datasets: habits
      .filter((habit) => habit.active)
      .map((habit) => ({
        label: habit.name,
        data: dateKeys.map((dateKey) => (habit.completed[dateKey] ? 1 : 0)),
        backgroundColor: habit.color,
        borderColor: habit.color,
        borderWidth: 1,
        fill: false,
      })),
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: period === "Day" ? "Hours" : "Days",
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Completion",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Habit Completion for the ${period}`,
      },
    },
  };

  return (
    <div>
      <div className="mb-4">
        <label>Chart Type: </label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
        </select>
      </div>
      {chartType === "bar" ? (
        <Bar data={data} options={options} />
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default HabitStatistics;
