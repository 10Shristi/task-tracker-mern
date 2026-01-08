import React, { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !dueDate) {
      setError("Title and Due Date are required");
      return;
    }

    onAdd({
      title,
      description,
      priority,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
<button type="submit" className="add-btn">
  Add Task
</button>
    </form>
  );
}

export default TaskForm;

