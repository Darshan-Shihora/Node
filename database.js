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

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error syncing table:", error);
  }
}
syncDatabase();
