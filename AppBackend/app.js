const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');

app.use(cors())
app.use(express.json());

const CONNECTION_URL = 'mongodb://localhost:27017/AirbnbApp';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Launch error, probably IP address on MongoDB:', err);
  });

const usersRouter = require('./routes/users');
const annoncesRouter = require('./routes/annonces');
const reservationsRouter = require('./routes/reservations');
const calendriersRouter = require('./routes/calendriers');

app.use('/users', usersRouter);
app.use('/annonces', annoncesRouter);
app.use('/reservations', reservationsRouter);
app.use('/calendriers', calendriersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});