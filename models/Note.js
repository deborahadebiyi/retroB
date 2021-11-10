const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        max: 250
    },    
    likes: {
        type: Array,
        default: []
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("Note", NoteSchema);