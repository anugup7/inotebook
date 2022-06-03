import React,{useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:"default"})
    const handleSubmit = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
    }
    const handleOnChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form className="my-3">
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
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={handleOnChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
           Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
