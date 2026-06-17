import { useSelector } from "react-redux";
// import ExpenseChart from "../components/ExpenseChart";
// import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css"

function Dashboard() {
  // const { user } = useAuth();

  const expenses = useSelector(
    (state) => state.expenses.expenses
  );

  const incomes = useSelector(
    (state) => state.income.incomes
  );

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );

  const balance = totalIncome - totalExpenses;

  const recentExpenses = expenses.slice(-3).reverse();

  return (
      <div className="expense-dashboard">
        <h2>Welcome Back 👋</h2>
        <p>Manage your finances efficiently</p>
        <h1>Finance Dashboard</h1>
        {/* <p>Welcome: {user?.email}</p> */}
        <div className="dashboard-cards">
        <div className="card income-card">
          <h3>Total Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses}</p>
        </div>

        <div className="card balance-card">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>
      <h2>Recent Expenses</h2>
      {recentExpenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        recentExpenses.map((expense) => (
          <div className="expense-item" key={expense.id}>
            <span>{expense.title}</span>
            <span>₹{expense.amount}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;