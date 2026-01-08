

const express = require("express");
const router = express.Router();

const {
  getNotes,
  addNote,
  updateNote,
  deleteNote
} = require("../controllers/taskController");


const {
  createTask,
  updateTaskStatus,
  getAllTasks,
   deleteTask,
} = require("../controllers/taskController");


router.post("/", createTask);
router.get("/", getAllTasks);

router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);


module.exports = router;
