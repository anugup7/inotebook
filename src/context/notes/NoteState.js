import NoteContext from "./noteContext";
import { useState } from "react";
import axios from "axios";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //Get all notes
  const getNote = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const url = `${host}/api/note/fetchallnotes`;
    axios.get(url, config).then((res) => {
      setNotes(res.data);
    });
  };
  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO:API call
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    const note = json.savedNotes;
    setNotes(notes.concat(note));
  };
  //Delete a note
  const deleteNote = (id) => {
    //API Call
    let config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const url = `${host}/api/note/deletenote/${id}`;
    axios.delete(url, config).then((res) => {
      console.log(res.data);
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    //logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i in newNotes) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, editNote, deleteNote, addNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
