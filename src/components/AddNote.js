import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
  const { showAlert } = props;
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note added successfully", "success");
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h2 className="text-center">Add Notes</h2>
        <form onSubmit={handleSubmit} className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              minLength={3}
              value={note.title}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleOnChange}
              minLength={5}
              value={note.description}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleOnChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
