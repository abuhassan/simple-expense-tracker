import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import TransactionItem from "../components/TransactionItem";
import Spinner from "../components/Spinner";

import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Correct selectors for user and transactions state
  const { user } = useSelector((state) => state.auth); // Assuming user is in the auth slice
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getTransactions()); // Fetch transactions for the logged in user }(admin or non-admin)
    }

    if (isError) {
      alert(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, navigate, dispatch, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Expense Dashboard</p>
      </section>

      <TransactionForm />

      <section className="content">
        {transactions.length > 0 ? (
          <div className="transactions">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <p>You have not registered any expense</p>
        )}
      </section>
    </>
  );
}

export default Dashboard;
