//mongoose
const mongoose = require("mongoose");

/**
 * connessione db mongo
 */
mongoose.connect('mongodb://127.0.0.1:27017/dylan', {
    useNewUrlParser: true, useUnifiedTopology: true
})

var db = mongoose.connection

//stampa in console eventuali errori
db.on('error', console.error.bind(console, 'MongoDB connection error:'));