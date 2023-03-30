const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();

app.use(express.json());
app.use(cors());

const db_url =
  "mongodb+srv://munawar_blogs:Munawar_Blogs@blogcluster.cjmaxwc.mongodb.net/Mern_Todo";

mongoose
  .connect(db_url)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.get("/todos", async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

app.delete("/todos/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.put("/todos/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();

  res.json(todo);
});

app.listen(3001, () => console.log("Server listening on port 3001"));
