import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

export const Book = sequelize.define("book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,
  },
  author: DataTypes.STRING,
  releaseDate: DataTypes.DATE,
});
