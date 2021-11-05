const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true
    },
    isLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    displayname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    moodCheck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Profile", ProfileSchema);
