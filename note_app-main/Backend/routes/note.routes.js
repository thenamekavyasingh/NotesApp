const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { NoteModel } = require('../models/NoteModel');
const { authenticator } = require('../middlewaers/authenticator');

const NoteRouter = express.Router();
NoteRouter.use(authenticator);
NoteRouter.get('/', (req, res) => {
    let token = req.headers.authorization
    jwt.verify(token, "PrivateKey", async (err, decode) => {
        try {
            let data = await NoteModel.find({ user: decode.userId })
            res.send({
                data: data,
                message: "data retrived successfully",
                status: 1
            })
        } catch (err) {
            res.send({
                message: err.message,
                status: 0
            })
        }
    })
});


NoteRouter.get('/edit', async (req, res) => {
    let noteID = req.headers.noteid;
    // noteID="65e0007a24b7f720564d69cc";
    if (!noteID) {
        return res.send({
            message: "note id not available in header ",
            status: 0
        })
    }

    try {
        const data = await NoteModel.findById(noteID);
        if (!data) {
            res.send({
                message: "note not found in database",
                status: 3
            })
        }

        res.send({
            data: data,
            message: "Data of note recieved 643",
            status: 1
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || 'Error retrieving note data.',
            status: 0
        });
    }
});


NoteRouter.post('/create', async (req, res) => {
    try {
        let note = new NoteModel(req.body)
        await note.save()
        res.send({
            message: "Note has been saved succefully",
            status: 1
        })
    } catch (error) {
        res.send({
            message: "Error froming note",
            status: 0
        })
    }
})


NoteRouter.patch('/', async (req, res) => {
    let id = req.body.noteId
    console.log(id)
    try {
        let updatedNote = await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
        updatedNote.save();
        res.send({
            message: "Updated Successfully",
            data: updatedNote,
            status: 1,
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})


NoteRouter.delete('/', async (req, res) => {
    let noteID = req.headers.noteid;
    console.log(noteID)
    try {
        let deletedNode = await NoteModel.findByIdAndDelete( noteID )
        // deletedNode.save();
        res.send({
            message: "Deleted Successfully",
            data: deletedNode,
            status: 1,
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})


// NoteRouter

module.exports = {
    NoteRouter
}