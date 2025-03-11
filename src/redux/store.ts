import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice"; // Import the todo slice

export const store = configureStore({
  reducer: {
    todos: todoReducer, // Register the todos reducer
  },
});

// Define RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
