import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  // Fetch notes from backend (later)
  useEffect(() => {
    axios.get("http://localhost:5000/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add new note
  const addNote = () => {
    if (!note.trim()) return;
    axios.post("http://localhost:5000/notes", { text: note })
      .then(res => {
        setNotes([...notes, res.data]); // append new note
        setNote(""); // clear input
      })
      .catch(err => console.log(err));
  };

  // Delete note
  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(n => n._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Notes App</h2>
      <div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
        />
        <button onClick={addNote}>Add</button>
      </div>
      <ul>
        {notes.map(n => (
          <li key={n._id}>
            {n.text}
            <button onClick={() => deleteNote(n._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
