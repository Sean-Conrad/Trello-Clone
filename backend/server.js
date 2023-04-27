const express = require('express')
const mongoose = require('mongoose')
const listRoutes = require('./routes/listRoutes')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/lists', listRoutes)

//connect to database
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log("Connected to Database!");
})

//listen for requests
app.listen(4000, ()=> {
    console.log('listening on port 4000')
})