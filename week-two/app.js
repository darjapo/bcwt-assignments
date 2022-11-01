'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

app.post('/cat', (req, res) => {
  console.log(req);
  res.send('From this endpoint you can add more cats.')
});

app.put('TODO');
app.delete('TODO');

app.get('/user', (req, res) => {
  res.send('From this endpoint you can get users.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
