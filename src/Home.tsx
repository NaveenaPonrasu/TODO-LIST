import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { toggleTodo, deleteTodo } from "./redux/todoSlice";
import { Todo } from "./types"; // ✅ Import the Todo type

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector((state: RootState) => state.todos.todos); // ✅ Explicitly use Todo[]
  const [filter, setFilter] = useState<string>("All");
  const [theme, setTheme] = useState<string>("light"); // default theme

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // ✅ Use Todo[] for filteredTodos
  const filteredTodos: Todo[] =
    filter === "Completed"
      ? todos.filter((todo) => todo.completed)
      : filter === "Incomplete"
      ? todos.filter((todo) => !todo.completed)
      : todos;

  return (
    <>
      <header>
        <div className="headtheme text-center mb-8 mt-[10%] ml-[35%]">
          <h1 className="text-[40px] font-bold dark">TODO LIST</h1>
          <div className="flex justify-center gap-2 mt-4">
            <div
              className="standard-theme theme-selector w-6 h-6 rounded-full cursor-pointer border-2 border-transparent hover:border-white"
              onClick={() => setTheme("standard")}
            ></div>
            <div
              className="light-theme theme-selector w-6 h-6 rounded-full cursor-pointer border-2 border-transparent hover:border-black"
              onClick={() => setTheme("light")}
            ></div>
            <div
              className="dark-theme theme-selector w-6 h-6 rounded-full cursor-pointer border-2 border-transparent hover:border-gray-400"
              onClick={() => setTheme("dark")}
            ></div>
          </div>
        </div>
        <div className="rounded-[5px] flex justify-between items-center bg-pink-700 p-2">
          <button
            className="bg-white text-black px-4 py-1 rounded-md shadow-md hover:bg-gray-200"
            onClick={() => navigate("/tasks")}
          >
            Add Task
          </button>
          <select
            className="border border-gray-300 p-2 rounded-md shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
      </header>

      {filteredTodos.length > 0 && (
        <div className="max-w-2xl mx-auto min-w-[80%] bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th> 
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((todo, index) => (
                <tr key={todo.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className={`border p-2 ${todo.completed ? "line-through text-gray-500" : ""}`}>
                    {todo.title}
                  </td>
                  <td className="border p-2">{todo.description || "No description"}</td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button
                      className={`px-3 py-1 rounded-md text-white ${todo.completed ? "bg-green-500" : "bg-gray-400"}`}
                      onClick={() => dispatch(toggleTodo(todo.id))}
                    >
                      {todo.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                      onClick={() => navigate(`/edit-task/${todo.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
