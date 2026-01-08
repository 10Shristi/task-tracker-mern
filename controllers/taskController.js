// const fs = require("fs");
// const path = "./notes.json";

// // GET all notes
// exports.getNotes = (req, res) => {
//   const data = JSON.parse(fs.readFileSync(path, "utf-8"));
//   res.json(data);
// };

// // ADD a note
// exports.addNote = (req, res) => {
//   const { title, content } = req.body;

//   const data = JSON.parse(fs.readFileSync(path, "utf-8"));

//   const newNote = {
//     id: Date.now().toString(),
//     title,
//     content
//   };

//   data.push(newNote);
//   fs.writeFileSync(path, JSON.stringify(data, null, 2));

//   res.json({ message: "Note added", note: newNote });
// };

// // UPDATE a note
// exports.updateNote = (req, res) => {
//   const data = JSON.parse(fs.readFileSync(path, "utf-8"));
//   const { id } = req.params;
//   const { title, content } = req.body;

//   const note = data.find(n => n.id === id);
//   if (!note) return res.status(404).json({ message: "Note not found" });

//   note.title = title || note.title;
//   note.content = content || note.content;

//   fs.writeFileSync(path, JSON.stringify(data, null, 2));

//   res.json({ message: "Note updated", note });
// };

// // DELETE a note
// exports.deleteNote = (req, res) => {
//   let data = JSON.parse(fs.readFileSync(path, "utf-8"));
//   const { id } = req.params;

//   data = data.filter(n => n.id !== id);
//   fs.writeFileSync(path, JSON.stringify(data, null, 2));

//   res.json({ message: "Note deleted" });
// };
const Task = require("../models/Task");


// GET all notes
// exports.getNotes = async (req, res) => {
//   try {
//     const notes = await Note.find().sort({ createdAt: -1 });
//     res.json(notes);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching notes" });
//   }
// };
// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// ADD a note
// CREATE a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // basic validation
    if (!title || !dueDate) {
      return res.status(400).json({
        message: "Title and Due Date are required",
      });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      status: "Pending", // default
    });

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};


// UPDATE a note
// UPDATE task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task status updated",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};


// DELETE a note
// exports.deleteNote = async (req, res) => {
//   try {
//     const deletedNote = await Note.findByIdAndDelete(req.params.id);

//     if (!deletedNote) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     res.json({ message: "Note deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting note" });
//   }
// };
// DELETE a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};
