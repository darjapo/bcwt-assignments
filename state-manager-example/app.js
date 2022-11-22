'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const dummyUser = {
  username: 'foo',
  password: 'bar'
};

// don't use global variables
let loggedIn = false;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({ extended: true })); //for form data

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if (loggedIn) {
    res.render('secret');
  } else {
    res.redirect('/form');
  }
});

app.post('/login', (req, res) => {
  // check for username/password match
  if (req.body.username == dummyUser.username && req.body.password == dummyUser.password) {
    loggedIn = true;
  };
  res.redirect('/secret');
});

app.get('/getCookie', (req, res) => {
  console.log(req.cookies);
  res.send('your color choice was: ' + req.cookies.color);
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('Color cookie deleted.');
});

app.get('/setCookie/:color', (req, res) => {
  console.log(req.params.color);
  res.cookie('color', req.params.color);
  res.send('cookie set');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
