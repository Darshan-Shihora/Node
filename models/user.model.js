import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { Book } from "./book.model.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userName: DataTypes.STRING,
  password: DataTypes.STRING,
  books: {
    type: DataTypes.STRING,
  },
});

