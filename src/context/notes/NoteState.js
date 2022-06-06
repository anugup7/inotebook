import NoteContext from "./noteContext";
import { useState } from "react";
import axios from "axios";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //Get all notes
  const getNote = async() => {
    const response = await fetch(`${host}/api/note/fetchallnotes`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5OTFiYmQ1YmI3NjkwZGU2MmFmZjA5In0sImlhdCI6MTY1NDIwMTI3N30.kmZDvYawQhzmTPWgAy4vTHveVVEaPbztFDZAC3VB2uU",
      }
    })
    const json = await response.json();
    console.log(json);
    setNotes(json)
  };
  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO:API call
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5OTFiYmQ1YmI3NjkwZGU2MmFmZjA5In0sImlhdCI6MTY1NDIwMTI3N30.kmZDvYawQhzmTPWgAy4vTHveVVEaPbztFDZAC3VB2uU",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    console.log("Adding a new note");
    const note = {
      _id: "62992179987e04b1bb959415",
      user: "62991bbd5bb7690de62aff09",
      title: title,
      description: description,
      tag: tag,
      date: "2022-06-02T20:45:45.112Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Delete a note
  const deleteNote = (id) => {
    //API Call
    let config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5OTFiYmQ1YmI3NjkwZGU2MmFmZjA5In0sImlhdCI6MTY1NDIwMTI3N30.kmZDvYawQhzmTPWgAy4vTHveVVEaPbztFDZAC3VB2uU",
      },
    };
    const url = `${host}/api/note/deletenote/${id}`;
    axios.delete(url, config).then((res) => {
      console.log(res.data);
    });
    console.log("Deleting a note");
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a note
  const editNote = async(id, title, description, tag) => {
    //API Call
   const response = await fetch(`${host}/api/note/updatenote/${id}`,{
     method: 'PUT',
     headers:{
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5OTFiYmQ1YmI3NjkwZGU2MmFmZjA5In0sImlhdCI6MTY1NDIwMTI3N30.kmZDvYawQhzmTPWgAy4vTHveVVEaPbztFDZAC3VB2uU",
     },
     body: JSON.stringify({title,description, tag})
   });
   const json = response.json();
   console.log(json);
    //logic to edit in client
    console.log("Edit note called")
    for (let element in notes) {
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
