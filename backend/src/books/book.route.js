const express = require('express');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const router = express.Router();

// POST a book
router.post("/create-book", postABook);

// GET all books or search for books with query parameter
router.get("/", getAllBooks);

// GET a single book
router.get("/:id", getSingleBook);

// PUT (edit) a book
router.put("/edit/:id", UpdateBook);

// DELETE a book
router.delete("/:id", deleteABook);

module.exports = router;
