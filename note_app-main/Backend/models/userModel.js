const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // Corrected typo here
}, {
    versionKey: false
});

const userModel = mongoose.model("User", userSchema); // Changed the model name to "User"

module.exports = {
    userModel
};
