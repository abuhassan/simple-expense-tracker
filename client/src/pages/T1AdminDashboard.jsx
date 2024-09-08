import { useSelector } from "react-redux";

function AdminDashboard() {
  const { users, transactions, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  console.log("AdminDashboard Rendered");
  console.log("Users:", users);
  console.log("Transactions:", transactions);
  console.log("Loading:", isLoading);
  console.log("Error:", isError, message);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {message}</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Render your users and transactions here */}
    </div>
  );
}

export default AdminDashboard;
