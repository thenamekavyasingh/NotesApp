import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from './noteCard';
import CreateNoteCard from './createNoteCard';
import { useNavigate } from 'react-router-dom';

function NoteComponent() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [showCreateNote, setShowCreateNote] = useState(false);
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

        const fetchNotes = async () => { 
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/note', {
                    headers: {
                        'Authorization': token
                    }
                });
                setNotes(response.data.data);
            } catch (error) {
                if (response.data.data.status===2)
                {
                    return navigate('/user/login')
                }
                setError('There was an error while fetching notes!');
            }
        };
        fetchNotes();
 
    function handleCreateButton() {
        navigate('/note/create');
    }

    return (
        <>
            <h1 className="bg-primary text-center text-white py-3">Notes Page</h1>
            <div className="text-center">
                <button onClick={handleCreateButton} className="btn btn-success">Create New Note</button>
            </div>
            <div className="row">
                {notes.map((note) => (
                    <div className="col-md-4 mb-4" key={note._id}>
                        <NoteCard note={note} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default NoteComponent;
