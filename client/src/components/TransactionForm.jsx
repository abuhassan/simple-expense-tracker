import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../features/transactions/transactionSlice";

function TransactionForm() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
  });

  const { description, amount } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount) {
      return alert("Please fill in all fields");
    }

    const transactionData = {
      description,
      amount: parseFloat(amount),
    };

    dispatch(createTransaction(transactionData));
    setFormData({
      description: "",
      amount: "",
    });
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            placeholder="Enter transaction description"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            placeholder="Enter amount"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Transaction
          </button>
        </div>
      </form>
    </section>
  );
}

export default TransactionForm;
