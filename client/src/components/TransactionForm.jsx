import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../features/transactions/transactionSlice";

function TransactionForm() {
  const [formData, setFormData] = useState({
    category: "", // 'income', 'expense', 'costOfGoods'
    amount: "",
    date: "",
  });

  const { category, amount, date } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!category || !amount) {
      alert("Please fill in all fields");
      return;
    }

    const transactionData = {
      category,
      amount: parseFloat(amount),
      date: new Date(date),
    };

    dispatch(createTransaction(transactionData));
    setFormData({
      category: "",
      amount: "",
      date: "",
    });
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700"></label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={onChange}
            className="form-select block w-full mt-1"
          >
            <option value="">Select category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="costOfGoods">Cost of Goods</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700"></label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={onChange}
            className="form-input block w-full mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700"></label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={onChange}
            className="form-input block w-full mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </form>
    </section>
  );
}

export default TransactionForm;
