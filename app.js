const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");

dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", ()=>{
    console.log("Successfully connected to mongo database")
})
//routes
// const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const notesRoute = require("./routes/notes")

//middleware
app.use(express.json()); //used to extract data from body of requests
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());


// app.use("/users", userRoute)
app.use("/auth", authRoute)
app.use("/profile", profileRoute)
app.use("/notes", notesRoute)
app.get("notes/retrospective",requireAuth)


module.exports = app;