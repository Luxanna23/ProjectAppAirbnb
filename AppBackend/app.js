const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
const usersRouter = require("./routes/users");
const annoncesRouter = require("./routes/annonces");
const reservationsRouter = require("./routes/reservations");
const calendriersRouter = require("./routes/calendriers");
const Annonce = require("./models/Annonce");

// Middleware
app.use(cors());
app.use(express.json());

const CONNECTION_URL = "mongodb://127.0.0.1:27017/AirbnbApp";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Launch error, probably IP address on MongoDB:", err);
  });
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
