//my code changes
const bcrypt = require('bcrypt')
const express = require('express')
const { userModel } = require('../models/userModel')
const userRouter = express.Router()
const saltRounds = 10
const mongoose = require('mongoose');
const { NoteModel } = require('../models/NoteModel')
const jwt = require('jsonwebtoken')


userRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ message: 'Users fetched successfully', data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name,email,password)
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            return res.send({
                message: "Eroor bcrpting password",
                status: 0
            })
        } try {
            let user = new userModel({ name, email, password: hash })
            await user.save();
            res.send({
                message: "User created successfully",
                status: 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
    });

})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let timing = {
        expiresIn: "20m"
    }
    // console.log(email, password)
    try {
        let data = await userModel.find({ email })
        if (data.length > 0) {
            let token = jwt.sign({ userId: data[0]._id }, "PrivateKey", timing);
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (result) {
                    res.send({
                        message: "User logged in Successfully",
                        status: 1,
                        token: token,
                        user: data[0]._id
                    })
                }
                else {
                    res.send({
                        message: "User login failed ",
                        status: 0
                    })
                }
            });
        }
        else {
            res.send({
                message: "user is not Registred",
                status: 0
            })
        }
    } catch (error) {
        res.send({
            message: ("Error 6669 " + error.message),
            status: 0
        })
    }
})

module.exports = { userRouter }