'use strict';

const express = require('express')
const app = express()
const port = 3000

let requestCounter = 0

app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.get('/catinfo', (req, res) => {
    const cat = {
        name: "Frank",
        birthdate: "2010-12-25",
        weight: 5,
    };
    res.json(cat)
})

app.get('/test', (request, response) => {
    console.log('Someone is trying to test me')
    requestCounter++
    response.send('<h1>TEST PAGE</h1><p>'+ requestCounter +'</p>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})