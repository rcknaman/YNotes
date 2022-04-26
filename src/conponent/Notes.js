import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom'
import NoteItem from '../conponent/NoteItem';
import AddNote from '../conponent/AddNote';
const Notes = (props) => {



    const context = useContext(noteContext);
    let navigate=useNavigate(); 
    const { notes, getNotes, addNote, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){

            getNotes();
        }else{
            navigate('/signin');
            props.showAlert("Please login to continue","danger");
        }

    }, [])
    const updateNote = function (currNote) {
        setnote({
            etitle: currNote.title,
            edescription: currNote.description,
            etag: currNote.tag,
            id: currNote._id


        });
        props.showAlert("Note updated Successfully","success");
    }
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const handleClick = function (e) {
        e.preventDefault();
        console.log(note);
        // addNote(note.etitle,note.edescription,note.etag);
        editNote(note.id, note.etitle, note.edescription, note.etag);
    }
    const onChange = function (e) {
        setnote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">



                                <div className="mb-3">
                                    <label htmlFor="etitle">Title </label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription">Description</label>
                                    <textarea className="form-control" value={note.edescription} id="edescription" name='edescription' rows="3" onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag">Tag</label>
                                    <input className="form-control" value={note.etag} id="etag" name='etag' rows="3" onChange={onChange}></input>
                                </div>
                                <button type="submit" disabled={note.edescription.length<5 || note.etitle.length<3} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Add Note</button>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Update Note</button>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="row">
                <h2>Your Notes</h2>
                <div className="container mx-3">
                    {notes.length === 0 && 'no notes to display'}

                </div>
                {notes.map(function (note) {
                    return <NoteItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes