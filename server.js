const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    http = require("http"),
    socketIO  = require("socket.io"),
    Post = require("./models/post"),
    port = process.env.PORT || 5000;

const app = express();

// User body-parser to extract request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Connect to mongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

// Server instance
const server = http.createServer(app);
// Create socket using instance of server
const io = socketIO(server);

// Socket connection handler
io.on("connection", (socket) => {
    console.log(socket.id + " Connected");

    socket.on('new post', (post) => {
        // Once a 'new post' event is received from a client, send it to the rest of clients
        console.log(`Received new post from ${socket.id} with body ${post.body}`);
        socket.broadcast.emit('new post', post);
    });

    socket.on('update post', (postID, newBody) => {
        // Once a 'update post' event is received from a client, send new body to the rest of clients
        console.log(`Received update from ${socket.id} with body ${newBody}`);
        socket.broadcast.emit('update post', postID, newBody);
    });

    socket.on('delete post', (postID) => {
        // Once a 'delete post' event is received from a client, send ID so the rest of clients can update state
        console.log(`Received delete from ${socket.id} for post ${postID}`);
        socket.broadcast.emit('delete post', postID);
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " Disconnected");
    });
});

// ---------- ROUTES ----------

// Retrieve posts
app.get("/posts", (req, res) => {
    Post.find({}, (err, allPosts) => {
        if(err) {
            console.log(err);
            res.status(400).send(err.message);
        } else {
            res.json(allPosts);
        }
    });
});

// Create new post
app.post("/posts/new", (req, res) => {
    let postBody = req.body.postBody;

    // Add post to database
    Post.create({body: postBody}, (err, newPost) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.message);
        } else {
            // Send new object back
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(newPost));
        }
    });
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            console.log(err);
            res.status(400).send(err.message);
        } else {
            res.sendStatus(200);
        }
    });
});

// Update post
app.put("/posts/:id", (req, res) => {
    Post.findByIdAndUpdate(req.params.id, {body: req.body.postBody}, (err, updatedPost) => {
        if(err) {
            console.log(err);
            res.status(400).send(err.message);
        } else {
            res.sendStatus(200);
        }
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//     console.log("Called");
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});