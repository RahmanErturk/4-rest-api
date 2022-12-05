import express from "express";
const app = express();

let notizen = [1, 2, 3];
let users = ["a", "b", "c"];

// Users lesen (GET)
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:index", (req, res) => {
  const index = req.params.index;
  res.json(users[index]);
});

// Neue user erstellen (POST)
app.post("/users", (req, res) => {
  users.push(users.length + 1);

  res.status(201).send("user created");
});

// User aktualisieren/bearbeiten (PUT/PATCH)
app.put("/users/:index", (req, res) => {
  const index = +req.params.index;
  users[index] = "zz";
  // Variante 1:
  // res.status(204).end(); // Schneller, weil wir weniger übermitteln müssen.
  // Variante 2:
  res.json(users[index]); // bei dieser Variante nehmen die Daten zu, die wir übertragen. Das könnte ein Problem bei großen Daten sein.
});

// User löschen (DELETE)
app.delete("/users/:index", (req, res) => {
  const index = +req.params.index;
  //   users = users.filter((_, userIndex) => userIndex !== index);
  users.splice(index, 1);
  res.status(204).end();
});

// ==============================================

// Notizen lesen (GET)
app.get("/notizen", (req, res) => {
  res.send(notizen);
});

// Neue Notiz erstellen (POST)
app.post("/notizen", (req, res) => {
  notizen.push(notizen.length + 1);

  res.send();
});

// Notiz aktualisieren/bearbeiten (PUT/PATCH)
app.put("/notizen", (req, res) => {
  notizen[notizen.length - 1] = notizen[notizen.length - 1] * 2;
  res.send();
});

// Notiz löschen (DELETE)
app.delete("/notien", (req, res) => {
  notizen.pop();
  res.send();
});

app.listen(3000, () => console.log("listening on port 3000"));

/**
 * Notiz App
 * --------------------
 *
 * REST API (Represntational State Transfer)
 *
 * -  Neue Notiz erstellen (POST)
 * -  Notizen lesen (GET)
 * -  Notiz aktualisieren/bearbeiten (PUT/PATCH)
 *      -PUT: Überschreiben des Datensatzes
 *      -PUSH: Bearbeiten des bestehenden Datensatzes
 * -  Notiz löschen (DELETE)
 *
 *
 * Status Codes
 * --------------------
 * 2xx => OK
 * 200 OK
 * 201 Created
 * 204 No Content
 *
 * 4xx => Client Error
 * 400 Client Error
 * 401 Unauthorized
 * 403 Forbidden
 * 404 Not Found
 *
 * 5xx = Server Error
 * 500 Server Error
 *
 */
