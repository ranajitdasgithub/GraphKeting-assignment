import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, deleteTask } from "../redux/TaskReducer/action";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [sortOption, setSortOption] = useState("priority"); // Default sort option

  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.task);
  const { userName, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (title && description) {
      const taskData = {
        title,
        description,
        assignedTo: [{ userName, userId }],
        dueDate,
      };
      dispatch(createTask(taskData));
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    if (sortOption === "priority") {
      return b.priority - a.priority; // Descending order of priority
    } else if (sortOption === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate); // Ascending order of due date
    }
    return 0;
  });

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="task-form">
        <h3>Create a New Task</h3>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>

      <div className="sort-options">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <h3>Task List</h3>
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="task-cards">
          {sortedTasks.length ? (
            sortedTasks.map((task) => (
              <div className="task-card" key={task._id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <ul>
                  Assigned To:{" "}
                  {task.assignedTo.map((user) => (
                    <li key={user._id}>{user.userName}</li>
                  ))}
                </ul>
                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p>Priority Score: {task.priority}</p>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
