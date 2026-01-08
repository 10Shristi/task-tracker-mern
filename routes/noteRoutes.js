// const express = require("express");
// const router = express.Router();
// const {
//   getNotes,
//   addNote,
//   updateNote,
//   deleteNote
// } = require("../controllers/noteController");

// router.get("/", getNotes);
// router.post("/", addNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

// module.exports = router;
// const express = require("express");
// const router = express.Router();

// // Force CORS headers for Express 5
// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
  
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
  
//   next();
// });

// const {
//   getNotes,
//   addNote,
//   updateNote,
//   deleteNote
// } = require("../controllers/noteController");

// router.get("/", getNotes);
// router.post("/", addNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getNotes,
  addNote,
  updateNote,
  deleteNote
} = require("../controllers/noteController");

router.get("/", getNotes);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
