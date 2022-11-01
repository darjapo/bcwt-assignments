'use strict';
const express = require('express');
const app = express();
const catRouter = require('./routes/catRoute')
const port = 3000;

app.use('/cat', catRouter);

app.get('/user', (req, res) => {
  res.send('From this endpoint you can get users.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
