import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { User } from "./user.model.js";

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
  // userId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: User,
  //     key: "id",
  //   },
  // },
});
