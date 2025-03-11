import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import TaskForm from "./components/TaskForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<TaskForm />} />
      </Routes>
    </Router>
  );
};

export default App;
