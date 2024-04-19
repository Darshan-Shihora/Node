import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userName: DataTypes.STRING,
  password: DataTypes.STRING,
});
