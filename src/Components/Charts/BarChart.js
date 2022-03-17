import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      }
    },
    scales: {
      y: {
        display: false,
      },
    },
  };

  const labels = props.labels;

  const data = {
    labels,
    datasets: [
      {
        label: "Correct Answers",
        data: props.correctAnswers,
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Incorrect Answers",
        data: props.incorrectAnswers,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
