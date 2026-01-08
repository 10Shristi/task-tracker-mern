const API_URL = "/api/notes";

// Fetch and display all notes
async function getNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();

  const notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  notes.forEach(note => {
    notesDiv.innerHTML += `
      <div class="note">
        <h3>${note.title}</h3>
        <p>${note.content}</p>

        <button class="update" onclick="updateNotePrompt('${note.id}')">Update</button>
        <button onclick="deleteNote('${note.id}')">Delete</button>
      </div>
    `;
  });
}
getNotes();

// Add a new note
async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  await res.json();
  getNotes();  // refresh list
}

// Update a note
async function updateNotePrompt(id) {
  const newTitle = prompt("Enter new title:");
  const newContent = prompt("Enter new content:");

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, content: newContent })
  });

  getNotes(); // refresh
}

// Delete a note
async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  getNotes(); // refresh
}
