import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import EditNote from './EditNote';
import axios from 'axios';
// import { ObjectId } from 'mongodb';

function NoteCard({ note }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        localStorage.setItem("noteID", note._id)
        navigate(`/note/edit`);
    };
    const handleDelete = async () => {
        try {
            const noteId = note._id;
            // const stringId = '5c0f66b979af55d98897912a';
            // const objectId = new ObjectId(stringId);
            console.log("fsd");
            console.log(noteId)
            const response = await axios.delete('http://localhost:4000/note/',
                {
                    headers:{
                        "noteID": noteId 
                    }}
            );
            // if (response.data.status === 2) {
            //     return navigate('/user/login')
            // }
            console.log(response)
            console.log("yqiug");
            navigate('/note');
        } catch (error) {
            console.log("sadfhjk", error);
            return navigate('/user/login')

        }
    };

    return (
        <Card className="mb-4" style={{ width: '14rem' }}>
            <Card.Body>
                <Card.Title className="text-center">{note.title}</Card.Title>
                <Card.Text>{note.body}</Card.Text>
                <div className="d-flex justify-content-between">
                    <Button onClick={handleEdit} variant="primary"> Edit </Button>
                    <Button onClick={handleDelete} variant="danger" className="ml-2">Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;