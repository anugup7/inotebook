import React, { useContext, useEffect, useRef, useState} from "react";
import noteContext from "../context/notes/noteContext";
import EditNoteModal from "./EditNoteModal";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    getNote();
    // eslint-disable-next-line
  }, []);
  const buttonRef = useRef(null);
  const closeRef = useRef(null)
  const [note, setNote] = useState({id:"",edittitle:"",editdescription:"",edittag:""})
  const handleOnChange =(e) => {
      setNote({...note,[e.target.name]:e.target.value})
  }

  const handleUpdate = (currentNote) => {
    buttonRef.current.click();
    setNote({id:currentNote._id, edittitle:currentNote.title,editdescription:currentNote.description, edittag:currentNote.tag})
  };

  const handleClick = (e) => {
    editNote(note.id, note.edittitle, note.editdescription, note.edittag);
    closeRef.current.click();
    console.log("Updating the note", note);
  };

  return (
    <>
      <EditNoteModal buttonRef={buttonRef} closeRef={closeRef} note={note} handleOnChange={handleOnChange} handleUpdate={handleUpdate} handleClick = {handleClick}/>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} handleUpdate={handleUpdate} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
