const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { NoteRouter } = require('./routes/note.routes');
require('dotenv').config();
const port = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.json());
app.use('/user', userRouter);
app.use('/note', NoteRouter)




app.listen(port, async () => {
    try {
        await connection;
        console.log("database is connected");
    } catch (err) {
        console.log("index.js 999", err);
    }
    console.log(`Server is running on ${port}`);
});
