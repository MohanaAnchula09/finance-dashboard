import { createSlice } from "@reduxjs/toolkit";

const savedExpenses = (() => {
  try {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  } catch {
    return [];
  }
})();

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: savedExpenses,
  },

  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);

      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },

    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      
      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },
    editExpense: (state, action) => {
      const { id, title, amount } = action.payload;
    
      const expense = state.expenses.find(
        (expense) => expense.id === id
      );
    
      if (expense) {
        expense.title = title;
        expense.amount = amount;
      }
      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  editExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;