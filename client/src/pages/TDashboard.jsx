import DoughnutChart from "../components/DoughnutChart";
import TransactionForm from "../components/TransactionForm";
import TransactionHistory from "../components/TransactionItem";
import { useSelector } from "react-redux";

function Dashboard() {
  // Correct selectors for user and transactions state

  const { transactions } = useSelector((state) => state.transactions);

  const expenses = transactions
    .filter((t) => t.category === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const income = transactions
    .filter((t) => t.category === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const costOfGoods = transactions
    .filter((t) => t.category === "costOfGoods")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DoughnutChart
            expenses={expenses}
            income={income}
            costOfGoods={costOfGoods}
          />
          <TransactionForm />
        </div>
        <TransactionHistory />
      </div>
    </>
  );
}

export default Dashboard;
