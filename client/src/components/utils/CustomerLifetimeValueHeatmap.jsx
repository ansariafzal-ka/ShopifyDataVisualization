import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale
);

const CustomerLifetimeValueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/customer-lifetime-value`
        );
        const result = await response.json();
        setData(result["Customer Lifetime Value by Cohort"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        label: "Total Lifetime Value",
        data: data.map((item) => item.totalLifetimeValue),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Number of Customers",
        data: data.map((item) => item.numberOfCustomers),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return (
              tooltipItem.dataset.label +
              ": " +
              tooltipItem.raw.toLocaleString()
            );
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Cohort",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div className="min-w-full h-full">
      <h2>Customer Lifetime Value by Cohorts</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CustomerLifetimeValueChart;
