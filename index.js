const express = require('express')
const app = express()

//HELMET - rende sicuri gli headers HTTP
var helmet = require('helmet');
app.use(helmet())

//DB CONN
require('./src/db/db-connect')

//PORT
const PORT = 3008

//JSON 
app.use(express.json({ limit: '10kb' })); // Body limit is 10 -> DoS prevent

app.get('/', function(req, res) {
    res.send('hello world')
})

//ROUTING
const songRouter = require('./src/routers/songs.js')
app.use(songRouter)

//SERVER LISTEN
app.listen(PORT, () => console.log('Server ready'))

