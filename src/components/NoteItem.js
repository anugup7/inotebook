import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { note, handleUpdate,showAlert } = props;
  const { deleteNote } = context;
  const handleDelete = (e) => {
    e.preventDefault();
    deleteNote(note._id);
    showAlert("Note deleted successfully","success");
  };

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={() => {
              handleUpdate(note);
            }}
          >
            Update<i className="fa-solid fa-pen-to-square mx-2"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={handleDelete}
          >
            Delete<i className="fa-solid fa-trash-can mx-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
