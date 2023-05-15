const express = require('express')
const ejs = require('ejs')
const server  = express()

const mainRoute = require('./routes/main')


server.set('view engine','ejs')
server.set('views', __dirname + '/views')
server.use(express.static(__dirname + '/public'))



server.use(express.json())

server.use('/', mainRoute)

server.listen(3000)