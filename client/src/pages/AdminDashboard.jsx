import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, fetchAllTransactions } from "../features/admin/adminSlice";
import Spinner from "../components/Spinner";
// import DoughnutChart from "../components/DoughnutChart";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { users, transactions, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );
  console.log("AdminDashboard Rendered");
  console.log("Users:", users);
  console.log("Transactions:", transactions);
  console.log("Loading:", isLoading);
  console.log("Error:", isError, message);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{message}</p>;
  }

  // Example stats calculation
  // const totalUsers = users.length;
  // const totalIncome = transactions
  //   .filter((t) => t.category === "income")
  //   .reduce((acc, t) => acc + t.amount, 0);
  // const totalExpenses = transactions
  //   .filter((t) => t.category === "expense")
  //   .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">User Statistics</h2>
          {/* <p>Total Users: {totalUsers}</p> */}
          {/* More user stats can go here */}
        </div>

        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Transaction Overview</h2>
          {/* <DoughnutChart
            expenses={totalExpenses}
            income={totalIncome}
            costOfGoods={0} // Example, update accordingly
          /> */}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-2">
              <span>
                {user.name} ({user.role})
              </span>
              {/* Add buttons or links to manage the user */}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className="mb-2">
              <span>
                {transaction.category}: ${transaction.amount} on{" "}
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
        {/* Add filters and search functionality here */}
      </div>
    </div>
  );
}

export default AdminDashboard;
