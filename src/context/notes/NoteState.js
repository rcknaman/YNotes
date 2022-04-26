import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = function (props) {
    const host = "http://localhost:5000";
    const notesInitial =[];
    const [notes, setNotes] = useState(notesInitial)

    let newNotes=JSON.parse(JSON.stringify(notes));
    //   add a note

    const addNote = async function (title, description, tag) {




        let url = `${host}/api/notes/addnote` ;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        console.log("adding a new note");
        let note = await response.json();
        setNotes(notes.concat(note));
    }

    // edit a note



    const editNote = async function (id, title, description, tag) {


        let url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });


        for (let index = 0; index < newNotes.length; index++) {
            let element = newNotes[index];
            if(id==element._id){

                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }
            
        }
        setNotes(newNotes);

        return response.json();



    }

    // delete a note
    const deleteNote =async function (id) {



        let url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });


        console.log(`note deleted with id ${id}`);

        let newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);


    }
    const getNotes=async function(){

        let url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        let obj=await response.json();
        console.log(obj);
        setNotes(obj);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>

            {props.children}

        </NoteContext.Provider>

    )


}

export default NoteState;