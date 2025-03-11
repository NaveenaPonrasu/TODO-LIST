import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Todo type
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Define initial state
interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

// Create the Redux slice
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
      const newTodo: Todo = { id: Date.now(), ...action.payload, completed: false };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<{ id: number; title: string; description: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
      }
    },
  },
});

// Export actions
export const { addTodo, toggleTodo, deleteTodo, updateTodo } = todoSlice.actions;

// Export reducer
export default todoSlice.reducer;
