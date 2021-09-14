require('dotenv').config();
// let MongoClient = require("mongodb").MongoClient; - Alternative!
// let mongodb = require("mongodb").MongoClient;
let { MongoClient } = require("mongodb");
let mongodb = require("mongodb");
let express = require("express");
let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

let database;
// MongoClient is required for connecting, just mongodb does not work!
MongoClient.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  database = client.db('To_do_list');
  // Moved from the base, to establish a connection from database to the server first; prior to rendering to the client.
  app.listen(3000);
});


app.get("/", (req, res) => {
  database.collection("tasks").find().toArray((err, tasks) => {
    // console.log(tasks);
    res.send(`
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="author" content="Stewart MacLeman">
          <meta name="description" content="A basic to-do-list app.">
          <link rel="stylesheet" href="./styles.css">

          <title>To-do-list</title>
        </head>

        <body>
          <h1>To-do-list</h1>

          <p>Add things to do via the form below!</p>

          <form class="" action="/create-task" method="POST">
            <div>
              <label for="taskInput">Input task:</label>
              <input type="text" id="taskInput" name="addedTask" autocomplete="off" autofocus>
            </div>
            <button type="submit">Add Item</button>
          </form>

          <ul>
            ${tasks.map((task) => {
              return `<li>
                <span>${task.addedTask}</span>
                <div>
                  <button data-id="${task._id}" type="button" class="edit">Edit</button>
                  <button type="button" class="delete">Delete</button>
                </div>
              </li>`
            }).join("")}
          </ul>

          <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
          <script src="./main.js"></script>
        </body>

      </html>
      `)
  })
});

app.post("/create-task", (req, res) => {
  // console.log(req.body.addedTask);
  database.collection("tasks").insertOne({addedTask: req.body.addedTask}, () => {
    // res.send("This is a post test!");
    res.redirect("/");
  })
});
// mongodb, not MongoClient is required. MongoClient returns an error.
app.post("/update-task", (req, res) => {
  database.collection("tasks").findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {addedTask: req.body.text}}, () => {
    res.send("Success!");
  })
  // console.log(req.body.text);
  // res.send("Success!");
});


// Moved!
// app.listen(3000);
