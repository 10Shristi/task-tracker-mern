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
const Note = require("../models/Note");

// GET all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

// ADD a note
exports.addNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });
    await newNote.save();

    res.json({ message: "Note added", note: newNote });
  } catch (err) {
    res.status(500).json({ message: "Error adding note" });
  }
};

// UPDATE a note
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note updated", note: updatedNote });
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
};

// DELETE a note
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
};
