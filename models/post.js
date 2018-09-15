var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    body: String,
    // userID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);