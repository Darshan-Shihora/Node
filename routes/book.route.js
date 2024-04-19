import express from "express";
import {
  postAddBook,
  getAllBooks,
  getBook,
  editBook,
  deleteBook,
  getInvoice,
} from "../controllers/book.controller.js";
import auth from "../middleware/is-auth.js";

export const bookRouter = express.Router();

bookRouter.get("/book", auth, getAllBooks);

bookRouter.get("/book/:bookId", auth, getBook);

bookRouter.post("/book", auth, postAddBook);

bookRouter.patch("/book/:bookId", auth, editBook);

bookRouter.delete("/book/:bookId", auth, deleteBook);

bookRouter.get("/invoice/:bookId", auth, getInvoice);
