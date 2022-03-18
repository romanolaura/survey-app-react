import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: props.backgroundColors,
        borderColor: props.borderColors,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: props.title,
        font: { size: "30em" },
      },
      subtitle: {
        display: true,
        text: props.subtitle,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (context.label) {
              label += ": ";
            }
            if (context.parsed) {
              label += context.formattedValue + "%";
            }
            return label;
          },
        },
      },
    },
  };
  return <Pie data={data} options={options} />;
};

export default PieChart;
