import React from "react";

function TaskItem({ task, onUpdate, onDelete }) {
 return (
  <li className="task-card">
    <div className="task-header">
      <h4>{task.title}</h4>
      <span
        className={`badge priority-${task.priority.toLowerCase()}`}
      >
        {task.priority}
      </span>
    </div>

    <p>{task.description}</p>

    <span
      className={`badge ${
        task.status === "Completed"
          ? "status-completed"
          : "status-pending"
      }`}
    >
      {task.status}
    </span>

    <p>
      <strong>Due:</strong>{" "}
      {new Date(task.dueDate).toLocaleDateString()}
    </p>

    <div className="task-actions">
      {task.status !== "Completed" && (
        <button
          className="complete-btn"
          onClick={() => onUpdate(task._id)}
        >
          Mark Completed
        </button>
      )}

      <button
        className="delete-btn"
        onClick={() => onDelete(task._id)}
      >
        Delete
      </button>
    </div>
  </li>
);

}

export default TaskItem;
