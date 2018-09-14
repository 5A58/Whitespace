const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 5000,
    {parse} = require('querystring');

const app = express();

let data =[{"id": 1, "body":"test1"},{"id": 2, "body":"test2"}, {"id": 3, "body": "test3"}];
let counter = 4;

// User body-parser to extract request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Retrieve posts
app.get("/posts", (req, res) => {
   res.json(data);
});

// Create new post
app.post("/posts/new", (req, res) => {
    let postBody = req.body.postBody;
    let newPost = {"id": counter, "body": postBody};

    // Add post to database
    data.push(newPost);
    counter++;
    console.log(data);

    // Send new object back
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(newPost));
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    var index = data.map(x => {
        return x.id;
    }).indexOf(Number(req.params.id));
    console.log(index);

    if(index !== -1) {
        data.splice(index, 1);
    }
    console.log(data);
    res.sendStatus(200);
});

// Update post
app.put("/posts/:id", (req, res) => {
    var index = data.map(x => {
        return x.id;
    }).indexOf(Number(req.params.id));
    console.log(index);

    if(index !== -1) {
        data[index].body = req.body.postBody;
    }

    console.log(data);
    res.sendStatus(200);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});