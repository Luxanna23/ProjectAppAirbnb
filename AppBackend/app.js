import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MongoClient } from "mongodb";
import usersRouter from "./routes/users.js";
import annoncesRouter from "./routes/annonces.js";
import reservationsRouter from "./routes/reservations.js";
import calendriersRouter from "./routes/calendriers.js";
import Annonce from "./models/Annonce.js";

//pour se co a la BDD
const app = express();
const PORT = 3000;
const CONNECTION_URL = "mongodb://127.0.0.1:27017/AirbnbApp";
// Middleware
app.use(cors());
app.use(express.json());

export var client = await mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`))
  )
  .catch(() => console.log("launch error, probably ip address on mongo db"));

//Routes
app.use("/api/users", usersRouter);
app.use("/annonces", annoncesRouter);
app.use("/reservations", reservationsRouter);
app.use("/calendriers", calendriersRouter);

//Route pour la page d'accueil des annonces
app.get("/", async (req, res) => {
  try {
    const annonces = await Annonce.find({});
    console.log(annonces);
    res.json(annonces);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
