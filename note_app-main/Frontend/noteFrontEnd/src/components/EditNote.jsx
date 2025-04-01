import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function EditNote() {
    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [noteID, setNoteID] = useState('');


    useEffect(() => {
        const fetchNoteData = async (noteID) => {
            try {
                const noteId = localStorage.getItem("noteID")
                const response = await axios.get("http://localhost:4000/note/edit", {
                    headers: {
                        "noteID": noteId
                    }
                });
                if (response.data.data.status === 2) {
                    return navigate('/user/login')
                }

                setTitle(response.data.data.title);
                setBody(response.data.data.body);
            } catch (error) {
                return navigate('/user/login')

                console.error('There was an error while fetching the note!', error.message);
            }
        };

        fetchNoteData(); // Call fetchNoteData when the component mounts
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const noteId = localStorage.getItem("noteID");
            const response = await axios.patch(
                `http://localhost:4000/note`,
                { title, body, noteId },
            );
            console.log("22", response.data.message);
            navigate('/note');
        } catch (error) {
            console.error('There was an error while updating the note!', error.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'lightgrey' }}>
            <div style={{ width: '50%', padding: '20px', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={handleTitleChange} placeholder="Enter Title" style={{ border: 'none' }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Body</Form.Label>
                        <Form.Control type="text" value={body} onChange={handleBodyChange} placeholder="Enter Body" style={{ border: 'none' }} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
        </div>
    );
}

export default EditNote;