import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";
// import TransactionItem from "../components/TransactionItem";
import Graph from "../components/Graph";
import Form from "../components/Form";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getTransactions());
    }

    if (isError) {
      alert(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className=" text-3xl font-bold text-center mb-8">
        Welcome to your Dashboard, {user && user.name}
      </h1>

      {/* grid columns */}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Chart */}
        <Graph></Graph>

        {/* Form */}
        <Form></Form>
      </div>
    </div>
  );
}

export default Dashboard;
