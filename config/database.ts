import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect:`mysql` /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
}
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connect Success!");
    })
    .catch((error) => {
        console.error("Connect Error: ", error);
    });


  

export default sequelize ;