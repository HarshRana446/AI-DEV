import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./db/db.js";
import userRoutes from "./route/user.route.js";


dotenv.config();


connect();

const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
