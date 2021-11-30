//mongoose
const mongoose = require('mongoose')
//unique validator
const uniqueValidator = require('mongoose-unique-validator')

const songSchema = new mongoose.Schema({

    title: { type: String, required: [true, 'required'], unique: true},
    album: { type: String, required: [true, 'required']},
    year: { type: Number, required: [true, 'required'], min: 1950, max: 2030 },
    slug: { type: String, required: [true, 'required']}
})

//messaggio di errore per il parametro unique
mongoose.plugin(uniqueValidator, { message: 'already recorded'} )

const Song = mongoose.model('song', songSchema)

module.exports = Song
