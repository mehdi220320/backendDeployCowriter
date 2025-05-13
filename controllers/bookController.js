const BookService = require("../services/bookService");
const path = require('path');
const booksWithImageUrls = (books, req)  => {
    return books.map(book => {
        const bookData = book.toObject();
        if (bookData.coverImage?.path) {
            bookData.coverImage = {
                ...bookData.coverImage,
                path: `http://${req.get('host')}/uploads/${path.basename(bookData.coverImage.path)}`
            };
        } else {
            bookData.coverImage = null;
        }
        return bookData;
    });
};

class BookController {
    static async createBook(req, res) {
        try {
            const { title, type, roomId, createdBy, firstChapterContent,description } = req.body;
            const coverImage = req.file;
            const book = await BookService.createBook(title, type, roomId, createdBy, firstChapterContent,description,{path: coverImage.path, contentType: coverImage.mimetype});
            res.status(201).json({ message: "Book created successfully!", book });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async markBookAsCompleted(req, res) {
        try {
            const { bookId, userId } = req.body;
            const book = await BookService.markBookAsCompleted(bookId, userId);
            res.status(200).json({ message: "Book marked as completed.", book });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getBooksByRoom(req, res) {
        try {
            const { roomId } = req.params;
            const books = await BookService.getBooksByRoom(roomId);
            const transformedBooks = booksWithImageUrls(books, req);
            res.status(200).json(transformedBooks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getBookById(req, res) {
        try {
            const { bookId } = req.params;
            let book = await BookService.getBookById(bookId);
            if (book.coverImage?.path) {
                book.coverImage.path = `http://${req.get('host')}/uploads/${path.basename(book.coverImage.path)}`;
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async markLastChapter(req, res) {
        try {
            const { bookId, userId } = req.body;
            const book = await BookService.markLastChapter(bookId, userId);
            res.status(200).json({ message: "The next chapter is marked as the last.", book });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async getAllBooks(req,res) {
        try {
            const books=await  BookService.getAllBooks();
            const transformedBooks = booksWithImageUrls(books, req);
            res.send(transformedBooks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = BookController;
