import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  SubTitle,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title, SubTitle);
const DoughnutChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || "";
            if (context.label) {
              label += ": ";
            }
            if(context.parsed) {
              label += context.formattedValue+'%';
            }
            return label
          }
        }
      }
    },
  };

  return (
      <Doughnut data={data} options={options} />
  );
};

export default DoughnutChart;
