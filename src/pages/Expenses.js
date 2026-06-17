import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addExpense,
    deleteExpense,
    editExpense,
  } from "../redux/expenseSlice";
import "../styles/Expenses.css";
function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [category, setCategory] = useState("");

  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
        dispatch(
          editExpense({
            id: editingId,
            title,
            amount: Number(amount),
          })
        );
      
        setEditingId(null);
      } else {
        dispatch(
            addExpense({
              id: Date.now(),
              title,
              amount: Number(amount),
              category,
            })
          );
      }

    setTitle("");
    setAmount("");
  };
  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(String(expense.amount));
    setCategory(expense.category);
    setEditingId(expense.id);
  };

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + expense.amount;
  
    return acc;
  }, {});
  return (
    <div className="expense-container"> 
      <h1>Expenses</h1>

      <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Search expense"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            </select>
        <button type="submit" className="add-btn">
        {editingId ? "Update Expense" : "Add Expense"}
     </button>
      </form>

      <h2>Total: ₹{totalAmount}</h2>

      {filteredExpenses.map((expense) => (
        <div key={expense.id} className="expense-card">
          <h3>{expense.title}</h3>
          <p>₹{expense.amount}</p>

          <button onClick={() => dispatch(deleteExpense(expense.id))}>
            Delete
          </button>
          <button onClick={() => handleEdit(expense)}>
            Edit
         </button>
         <p>Category: {expense.category}</p>
        </div>
      ))}

        <h2>Category Totals</h2>

        {Object.entries(categoryTotals).map(([category, total]) => (
        <p key={category}>
            {category}: ₹{total}
        </p>
        ))}
      
      {filteredExpenses.length === 0 ? (
      <p>No expenses found.</p>)
    :(<div><p>Total Expenses: {expenses.length}</p>
          <p>Showing: {filteredExpenses.length}</p></div>)}
        </div>
      );
}

export default Expenses;