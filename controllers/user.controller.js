import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Book } from "../models/book.model.js";

export const postSignUp = async (req, res, next) => {
  const { userName, password } = req.body;
  const existingUser = await User.findOne({ where: { userName: userName } });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      userName: userName,
      password: hashedPassword,
    });
    res.status(200).send({
      user: user,
      message: "User successfully added",
      status: "Success",
    });
  } else {
    res.status(409).send({
      message: "User already exist",
      status: "Error",
    });
  }
};

export const postLogin = async (req, res, next) => {
  const { userName, password } = req.body;
  const existingUser = await User.findOne({ where: { userName: userName } });
  let loadedUser;
  if (existingUser) {
    loadedUser = existingUser;
    const decodedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (decodedPassword) {
      const token = jwt.sign(
        {
          userName: loadedUser.userName,
          userId: loadedUser.id.toString(),
        },
        "mySuperSecret",
        { expiresIn: "2h" }
      );
      res.setHeader("Postman-Token", token);
      res.status(200).send({
        message: "User successfully login",
        status: "Success",
      });
    } else {
      res.status(401).send({
        message: "Wrong credentials",
        status: "Error",
      });
    }
  } else {
    res.status(403).send({
      message: "No User exist",
      status: "Error",
    });
  }
};

export const getUsers = async (req, res, next) => {
  const users = await User.findAll({
    include: [
      {
        model: Book,
        as: "book",
        attributes: ["title", "image", "author", "releaseDate", "userId"],
      },
    ],
  });
  console.log(users);
  res.send({
    data: users,
  });
};
