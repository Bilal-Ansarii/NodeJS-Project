const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App is running on port 3000");
    });
    db = getDb();
  } else {
    console.error("Failed to connect to the database");
    process.exit(1); // Exit the application if the database connection fails
  }
});

app.get("/books", (req, res) => {
  const page = req.query.p || 0;
  const booksPerPage = 4;

  let books = [];
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch books" });
    });
});

app.get("/books/search", (req, res) => {
  const query = req.query.q || "";
  const page = req.query.p || 0;
  const booksPerPage = 4;

  let books = [];
  db.collection("books")
    .find({ title: { $regex: query, $options: "i" } })
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch books" });
    });
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ err: "Could not fetch the document" });
      });
  } else {
    res.status(400).json({ err: "Not a valid document id" });
  }
});

app.post("/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.delete("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ err: "Could not delete the document" });
      });
  } else {
    res.status(400).json({ err: "Not a valid document id" });
  }
});

app.patch("/books/:id", (req, res) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ err: "Could not update the document" });
      });
  } else {
    res.status(400).json({ err: "Not a valid document id" });
  }
});
