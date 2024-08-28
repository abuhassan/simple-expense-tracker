import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../features/transactions/transactionSlice";

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTransaction(transaction._id));
  };

  return (
    <div className="transaction-item">
      <h3>{transaction.description}</h3>
      <p>{transaction.amount.toFixed(2)} MYR</p>
      <button onClick={onDelete} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
}

TransactionItem.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default TransactionItem;
