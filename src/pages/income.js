import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addIncome,
  deleteIncome,
  editIncome,
} from "../redux/incomeSlice";
import "../styles/Income.css";

function Income() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);

  const incomes = useSelector((state) => state.income.incomes);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount) return;

    if (editingId) {
      dispatch(
        editIncome({
          id: editingId,
          title,
          amount: Number(amount),
        })
      );

      setEditingId(null);
    } else {
      dispatch(
        addIncome({
          id: Date.now(),
          title,
          amount: Number(amount),
        })
      );
    }

    setTitle("");
    setAmount("");
  };

  const handleEdit = (income) => {
    setTitle(income.title);
    setAmount(String(income.amount));
    setEditingId(income.id);
  };

  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );

  return (
    <div className="income-container">
      <h1>Income</h1>

      <form onSubmit={handleSubmit} className="income-form">
        <input
          type="text"
          placeholder="Income source"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Update Income" : "Add Income"}
        </button>
      </form>

      <h2>Total Income: ₹{totalIncome}</h2>

      {incomes.map((income) => (
        <div key={income.id} className="income-card">
          <h3>{income.title}</h3>
          <p>₹{income.amount}</p>

          <button onClick={() => handleEdit(income)}>
            Edit
          </button>

          <button onClick={() => dispatch(deleteIncome(income.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Income;