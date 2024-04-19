import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  "hello_world",
  process.env.USER,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

// async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.log(error);
//   }
// };