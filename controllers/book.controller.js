import { Book } from "../models/book.model.js";
import path from "path";
import fs from "fs";
import PDFDocument from "pdfkit";

// GET ALL BOOKS
export const getAllBooks = async (req, res, next) => {
  const books = await Book.findAll();
  if (books && books.length > 0) {
    res.send({
      data: books,
      message: "Data found sucessfully",
      status: "Success",
    });
  } else {
    res.send({
      data: null,
      message: "No Data available",
      status: "Success",
    });
  }
};

// GET SINGLE BOOK -----------------------------------------------------------------------
export const getBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const book = await Book.findOne({ where: { id: bookId } });
  if (book) {
    res.send({
      data: book,
      message: "Data found sucessfully",
      status: "Success",
    });
  } else {
    res.status(404).send({
      data: null,
      message: "Data not found",
      status: "Fail",
    });
  }
};

// ADD NEW BOOK ------------------------------------------------------------------------
export const postAddBook = async (req, res, next) => {
  const { title, author, releaseDate } = req.body;
  const image = req.file;
  console.log(req.file);
  const imageUrl = image.path.split("\\")[1];
  console.log(imageUrl);
  const exsistingBook = await Book.findOne({ where: { title: title } });
  if (!exsistingBook) {
    const book = await Book.create({
      title: title,
      author: author,
      releaseDate: releaseDate,
      image: imageUrl,
    });
    res.send({
      data: book,
      message: "Data added sucessfully",
      status: "Success",
    });
  } else {
    res.send({ data: null, message: "Data already exist", status: "Fail" });
  }
};

// UPDATE BOOK --------------------------------------------------------------------------
export const editBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const { title, author, releaseDate } = req.body;
  const image = req.file;
  const imageUrl = image.path.split("\\")[1];

  const isDataExist = await Book.findOne({ where: { id: bookId } });
  if (isDataExist) {
    isDataExist.title = title;
    isDataExist.author = author;
    isDataExist.releaseDate = releaseDate;
    isDataExist.image = imageUrl;
    isDataExist.save();

    res.send({
      data: isDataExist,
      message: "Data Updated Successfully",
      statue: "Success",
    });
  } else {
    res.status(404).send({
      data: null,
      message: "Data not found",
      status: "Fail",
    });
  }
};

// DELETE BOOK -------------------------------------------------------------------------
export const deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const book = await Book.findOne({ where: { id: bookId } });
  if (book) {
    res.send({
      data: book,
      message: "Data deleted Successfully",
      statue: "Success",
    });
    book.destroy();
  } else {
    res.status(404).send({
      data: null,
      message: "No Data Found",
      statue: "Fail",
    });
  }
};

export const getInvoice = async (req, res, next) => {
  const bookId = req.params.bookId;
  const invoiceName = "invoice-" + bookId + ".pdf";
  const invoicePath = path.join("invoices", invoiceName);

  const pdfDoc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'inline; filename="' + invoiceName + '"'
  );
  pdfDoc.pipe(fs.createWriteStream(invoicePath));
  pdfDoc.pipe(res);
  pdfDoc.text("Hello World");
  pdfDoc.end();

  // const file = fs.createReadStream(invoicePath);
  // res.setHeader("Content-Type", "application/pdf");
  // res.setHeader(
  //   "Content-Disposition",
  //   'inline; filename="' + invoiceName + '"'
  // );
  // file.pipe(res);
};
