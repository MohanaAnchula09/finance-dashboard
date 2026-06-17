import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import incomeReducer from "./incomeSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    income: incomeReducer,
  },
});