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

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/test', (request, response) => {
    console.log('Someone is trying to test me')
    requestCounter++
    // Pug html implementation
    response.render('test', {
        tittle: "Pug test page",
        header1: "Pug test page",
        header2: "Counter",
        exampleText: "Page requested " + requestCounter + " times.",
    })
    // basic html as string
    //response.send('<h1>TEST PAGE</h1><p>'+ requestCounter +'</p>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})