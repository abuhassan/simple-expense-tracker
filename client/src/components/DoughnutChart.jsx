import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";

function DoughnutChart({ expenses, income, costOfGoods }) {
  const data = {
    labels: ["Expenses", "Income", "Cost of Goods"],
    datasets: [
      {
        data: [expenses, income, costOfGoods],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}

DoughnutChart.propTypes = {
  expenses: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  costOfGoods: PropTypes.number.isRequired,
};

export default DoughnutChart;
