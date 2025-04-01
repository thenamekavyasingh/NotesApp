import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function CreateNoteCard({ user }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/note/create',
                { title, body, user });

            console.log(response.data.status);
            if (response.data.status === 2) {
                return navigate('/user/login')
            }
            navigate('/note');
        } catch (error) {
            console.error('There was an error while creating the note!', error.message);
            return navigate('/user/login')
        }
    }

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

export default CreateNoteCard;
