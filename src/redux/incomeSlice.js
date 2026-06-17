import { createSlice } from "@reduxjs/toolkit";

const savedIncome = (() => {
  try {
    return JSON.parse(localStorage.getItem("income")) || [];
  } catch {
    return [];
  }
})();

const incomeSlice = createSlice({
  name: "income",

  initialState: {
    incomes: savedIncome,
  },

  reducers: {
    addIncome: (state, action) => {
      state.incomes.push(action.payload);
      localStorage.setItem("income", JSON.stringify(state.incomes));
    },

    deleteIncome: (state, action) => {
      state.incomes = state.incomes.filter(
        (income) => income.id !== action.payload
      );
      localStorage.setItem("income", JSON.stringify(state.incomes));
    },

    editIncome: (state, action) => {
      const { id, title, amount } = action.payload;

      const income = state.incomes.find((income) => income.id === id);

      if (income) {
        income.title = title;
        income.amount = amount;
      }

      localStorage.setItem("income", JSON.stringify(state.incomes));
    },
  },
});

export const {
  addIncome,
  deleteIncome,
  editIncome,
} = incomeSlice.actions;

export default incomeSlice.reducer;