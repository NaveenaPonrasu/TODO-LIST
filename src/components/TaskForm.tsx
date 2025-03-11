import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { addTodo, updateTodo } from "../redux/todoSlice";

type FormData = {
  title: string;
  description: string;
};

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const task = todos.find((todo) => todo.id === Number(id));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
    } else {
      reset();
    }
  }, [task, setValue, reset]);

  const onSubmit = (data: FormData) => {
    if (id) {
      dispatch(updateTodo({ id: Number(id), ...data }));
    } else {
      dispatch(addTodo(data));
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-pink-700 p-5 rounded-lg shadow-lg">
      <h1 className="text-white text-2xl font-bold text-center">{id ? "Edit Task" : "Add Task"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
        <input
          type="text"
          {...register("title", { required: "⚠️ Title is required!" })}
          className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
          placeholder="Task Title..."
        />
        {errors.title && <p className="text-yellow-300">{errors.title.message}</p>}

        <textarea
          {...register("description", { required: "⚠️ Description is required!" })}
          className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
          placeholder="Task Description..."
        />
        {errors.description && <p className="text-yellow-300">{errors.description.message}</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          {id ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
