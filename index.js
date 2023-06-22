import express from "express";
import swaggerUI from "swagger-ui-express";
import cors from "cors";

import connection from "./src/config/db.js";
import adminRoutes from "./src/routes/admin.routes.js";
import voterRoutes from './src/routes/voter.routes.js'
import swaggerDoc from "./swagger.js";

const port = 4370;
const app = express();

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the MySQL database");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/admin", adminRoutes);
app.use("/voter", voterRoutes);

app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
