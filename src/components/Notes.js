import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import EditNoteModal from "./EditNoteModal";
import NoteItem from "./NoteItem";

function Notes(props) {
  let navigate = useNavigate();
  const { showAlert } = props;
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const buttonRef = useRef(null);
  const closeRef = useRef(null);
  const [note, setNote] = useState({
    id: "",
    edittitle: "",
    editdescription: "",
    edittag: "",
  });
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdate = (currentNote) => {
    buttonRef.current.click();
    setNote({
      id: currentNote._id,
      edittitle: currentNote.title,
      editdescription: currentNote.description,
      edittag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.edittitle, note.editdescription, note.edittag);
    closeRef.current.click();
    showAlert("Note updated", "success");
  };

  return (
    <>
      <EditNoteModal
        buttonRef={buttonRef}
        closeRef={closeRef}
        note={note}
        handleOnChange={handleOnChange}
        handleClick={handleClick}
      />
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              handleUpdate={handleUpdate}
              showAlert={showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
