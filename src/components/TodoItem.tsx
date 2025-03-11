import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo }: TodoItemProps) => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{todo.title}</h3>
      <p className="text-gray-600">{todo.description}</p>

      <div className="flex justify-between mt-2">
        <button
          className={`px-3 py-1 rounded-md text-white ${
            todo.completed ? "bg-green-500" : "bg-gray-400"
          }`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.completed ? "Completed" : "Mark Done"}
        </button>
        <button
          className="px-3 py-1 bg-pink-700 text-white rounded-md"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
