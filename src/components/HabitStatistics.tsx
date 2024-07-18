import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import AnnotationPlugin from "chartjs-plugin-annotation";
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
  ChartOptions,
  ArcElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  AnnotationPlugin
);

const colors = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
  "rgba(75, 192, 192, 0.6)",
  "rgba(153, 102, 255, 0.6)",
  "rgba(255, 159, 64, 0.6)",
];

interface HabitStatisticsProps {
  habits: {
    id: number;
    name: string;
    category: string;
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
    datasets: habits.map((habit, index) => ({
      label: habit.name,
      data: dateKeys.map((dateKey) => (habit.completed[dateKey] ? 1 : 0)),
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 1,
      fill: true,
    })),
  };

  const doughnutData = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        data: habits.map((habit) =>
          dateKeys.reduce(
            (total, dateKey) => total + (habit.completed[dateKey] ? 1 : 0),
            0
          )
        ),
        backgroundColor: habits.map(
          (_, index) => colors[index % colors.length]
        ),
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
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
        position: "top",
      },
      title: {
        display: true,
        text: `Habit Completion for the ${period}`,
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 0,
            yMax: 1,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
          },
        },
      },
    },
  } as ChartOptions<"line">;

  const barOptions: ChartOptions<"bar"> = {
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
        position: "top",
      },
      title: {
        display: true,
        text: `Habit Completion for the ${period}`,
      },
    },
  } as ChartOptions<"bar">;

  return (
    <div className="flex mb-5 space-x-2">
      {period === "Day" ? (
        <div style={{ width: "700px" }}>
          <Line data={data} options={lineOptions} />
        </div>
      ) : (
        <div style={{ width: "700px" }}>
          <Bar data={data} options={barOptions} />
        </div>
      )}
      <div style={{ width: "400px", height: "400px" }}>
        <Doughnut data={doughnutData} />
      </div>
    </div>
  );
};

export default HabitStatistics;
