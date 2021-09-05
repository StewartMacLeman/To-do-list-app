require('dotenv').config();
let { MongoClient } = require("mongodb");
let express = require("express");
let app = express();

let database;

MongoClient.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  database = client.db('To_do_list');
  // Moved from the base, to establish a connection from database to the server first; prior to rendering to the client.
  app.listen(3000);
});

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Stewart MacLeman">
        <meta name="description" content="A basic to-do-list app.">
        <link rel="stylesheet" href="./styles.css">
        <script src="./main.js" defer></script>

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
          <li>
            <span>Wash the car</span>
            <div>
              <button type="button" class="edit">Edit</button>
              <button type="button" class="delete">Delete</button>
            </div>
          </li>

          <li>
            <span>Cut the grass</span>
            <div>
              <button type="button" class="edit">Edit</button>
              <button type="button" class="delete">Delete</button>
            </div>
          </li>

          <li>
            <span>Buy milk</span>
            <div>
              <button type="button" class="edit">Edit</button>
              <button type="button" class="delete">Delete</button>
            </div>
          </li>

          <li>
            <span>Buy beer</span>
            <div>
              <button type="button" class="edit">Edit</button>
              <button type="button" class="delete">Delete</button>
            </div>
          </li>

        </ul>
      </body>
    </html>
    `)
});

app.post("/create-task", (req, res) => {
  // console.log(req.body.addedTask);
  database.collection("tasks").insertOne({addedTask: req.body.addedTask}, () => {
    res.send("This is a post test!");
  })
});

// Moved!
// app.listen(3000);
