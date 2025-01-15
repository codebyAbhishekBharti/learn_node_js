// Purpose: To create a simple server using express
// const http = require("http");
const express = require("express");

const app = express();
app.get("/", (req, res) => {
    res.end("Hello from Home Page");
});

app.get("/about", (req, res) => {
    // res.end("Hello from About Page");
    res.end("Hello from About Page "+"hey "+req.query.name+" you're age is "+req.query.age);
});

// const myServer = http.createServer(app);
// myServer.listen(8000, ()=> console.log("Server Started"));
app.listen(8000, ()=> console.log("Server Started"));