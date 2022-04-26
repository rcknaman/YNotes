import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
// import AddNote from './addNote';
const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "",id:"" })
    const handleClick = function (e) {
        e.preventDefault(); 
        addNote(note.title,note.description,note.tag);
        props.showAlert("Note added successfully","success");
        setnote({ title: "", description: "", tag: "",id:"" });
    }
    const onChange = function (e) {
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container my-5">


                <h3 className='my-4'>Add a Note</h3>
                <form action="">



                    <div className="mb-3">
                        <label htmlFor="title">Title </label>
                        <input type="text" className="form-control" value={note.title} id="title" name="title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" value={note.description} name='description' rows="3" onChange={onChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag">Tag</label>
                        <input className="form-control" id="tag" name='tag' value={note.tag} rows="3" onChange={onChange}></input>
                    </div>
                    <button type="submit" disabled={note.description.length<5 || note.title.length<3} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote