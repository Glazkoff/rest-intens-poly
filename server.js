const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/**
 * C - CREATE - POST
 * R - READ - GET
 * U - UPDATE - PUT
 * D - DELETE - DELETE
 *
 */
let users = [
  {
    id: 1,
    name: "Nikita",
    description: "123"
  },
  {
    id: 2,
    name: "Mihail",
    description: "asd"
  },
  {
    id: 3,
    name: "Anton",
    description: "qwe"
  }
];

app.get("/", (request, response) => {
  response.send("Это наше API!!!");
});

// POST: /users
app.post("/users", (req, res) => {
  console.log(req.body);
  let newUser = {
    id: users[users.length - 1].id + 1,
    name: req.body.name,
    description: req.body.description
  };
  users.push();
  res.send(newUser);
});

// GET: /users
app.get("/users", (request, response) => {
  response.send(users);
});

// TODO: UPDATE: /users
app.put("/users/:id", (req, res) => {
  let index = users.findIndex(el => +el.id === +req.params.id);
  if (index === -1) {
    res.status(404).send({ error: "Нет такого элемента!" });
  } else {
    users[index].name = req.body.name;
    users[index].description = req.body.description;
    res.send(users);
  }
});

// DELETE: /users
app.delete("/users/:id", (req, res) => {
  let index = users.findIndex(el => +el.id === +req.params.id);
  if (index === -1) {
    res.status(404).send({ error: "Нет такого элемента!" });
  } else {
    users.splice(index, 1);
    res.send(users);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
