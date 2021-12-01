const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    post_id:{
        type: String,
        require: true,
    },
    user_id:{
        type: String,
        require: true,
    }
},{timestamps:true})

module.exports = mongoose.model("Comment", CommentSchema)

