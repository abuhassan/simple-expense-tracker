import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminPanelData, reset } from "../features/admin/adminSlice";
import Spinner from "../components/Spinner";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { adminPanelData, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminPanelData());

    if (isError) {
      alert(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <p>Total Users: {adminPanelData.users.length}</p>
        <p>Total Transactions: {adminPanelData.transactions.length}</p>
        {/* Add more admin-specific stats here */}
      </div>
      {/* Additional sections for managing users, viewing transactions, etc. */}
    </div>
  );
}

export default AdminDashboard;
