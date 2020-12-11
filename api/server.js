/*                                            Import                                            */
const db = require("./mongodb/connection");
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');

const session = require('express-session');

global.fetch = require('node-fetch');


var app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));



app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.listen(5000, function () {
  console.log('NodeJs is running on localhost:5000 !')
})

db.connect(() => {
  app.listen(process.env.PORT || 5555, function () {
    console.log('Mongo Listening :5555');
  });
});



const usersRouter = require('./routes/users');
const cryptosRouter = require('./routes/cryptos');
const articlesRouter = require('./routes/articles');
const authRouter = require('./routes/oauth');

app.use('/users', usersRouter);
app.use('/cryptos', cryptosRouter);
app.use('/articles', articlesRouter);
app.use('/users/auth', authRouter);

