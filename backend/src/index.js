import dotenv from "dotenv";
import connectDB from "./database/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Error in connecting MONGODB: ", err);
    });
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection Failure: ", err);
  });