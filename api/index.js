const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/users.js");
const postRouter = require("./routes/posts.js");
const uploading = require("./routes/uploading.js");

// connect to MongoDB_URL & encrypt the URL
dotenv.config();
mongoose
    .connect(process.env.MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(
        () => {
            console.log("MongoDB is connected");
        },
        (err) => {
            console.log(err);
        }
    );

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Router
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

// uploading
app.use("/api", uploading);
app.use("/images", express.static(path.join(__dirname, "public/images")));


// Heroku deployment
// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });


app.listen( process.env.PORT || 3333, () => {
    console.log("Server is running!");
});


