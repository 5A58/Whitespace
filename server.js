const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 5000;

const app = express();

const data =[{"id": 1, "name":"test1"},{"id": 2, "name":"test2"}, {"id": 3, "name": "test3"}];
let counter = 4;

// User body-parser to extract request body
app.use(bodyParser.urlencoded({extended: true}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/posts", (req, res) => {
   res.json(data);
});

app.post("/new", (req, res) => {
    data.push({"id": counter, "name": req.body.postBody});
    counter++;
    res.redirect("/results");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});