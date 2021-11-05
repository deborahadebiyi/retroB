const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 4,
        max: 16,
        unique: [true, "Username already in use"]
    },
    password: {
        type: String,
        require: true,
        min: 8,
        select: true
    },
    displayname: {
        type: String,
        require: true,
        min: 4,
        max: 40
    },
    avatar: {
        type: String,
        default: '../avatar.png'
    },
    isLead: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    moodCheck: {
        type: Number,
        enum: [1,2,3,4,5]
    },
    team: {
        type: Array,
        default: []
    }
})



module.exports = mongoose.model("User", UserSchema);