var express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully.");
})

const vocabsRouter = require('./routes/vocabs');
const usersRouter = require('./routes/users');

app.use('/vocabs', vocabsRouter);
app.use('/users', usersRouter);

var server = app.listen(port, () => { 
   console.log("Server is running on port: %s", port)
})