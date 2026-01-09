

import React, { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskItem from "./Components/TaskItem";
import "./App.css";

const API_URL = "/api/tasks";


function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // GET tasks
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => setError("Failed to load tasks"));
  }, []);

  // POST task
  const addTask = async (task) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([data.task, ...tasks]);
  };

  // PUT update status
  const updateStatus = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" }),
    });

    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, status: "Completed" } : task
      )
    );
  };

  // DELETE task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="app-container">

      <h1>Task Tracker</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskForm onAdd={addTask} />

      <h3>Your Tasks</h3>
      {tasks.length === 0 && <p>No tasks yet</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdate={updateStatus}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;



