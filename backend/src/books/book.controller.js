//const Book = require("./book.model");

import  Book  from "./book.model.js";

export const  postABook = async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", book: newBook})
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({message: "Failed to create book"})
    }
}

// Get all books or filter by search query
export const getAllBooks = async (req, res) => {
    try {
        const { query } = req.query;  // Get search query from request parameters
        const filter = query
            ? {
                $or: [
                    { title: { $regex: query, $options: 'i' } },  // Search by title (case-insensitive)
                    { category: { $regex: query, $options: 'i' } }, // Search by category (case-insensitive)
                    { author: { $regex: query, $options: 'i' } }, 
                ],
            }
            : {};

        const books = await Book.find(filter).sort({ createdAt: -1 });
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" });
    }
}

export const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ message: "Book not Found!" });
        }
        res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({ message: "Failed to fetch book" });
    }
}

export const UpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).send({ message: "Book not Found!" });
        }
        res.status(200).send({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        console.error("Error updating book", error);
        res.status(500).send({ message: "Failed to update book" });
    }
}

export const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not Found!" });
        }
        res.status(200).send({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).send({ message: "Failed to delete book" });
    }
}

//module.exports = {
//    postABook,
//    getAllBooks,
//    getSingleBook,
//    UpdateBook,
//    deleteABook
//}
