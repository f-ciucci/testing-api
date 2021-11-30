const Song = require('../models/songs')
const express = require('express')
const router = new express.Router()
const { body, validationResult, param } = require('express-validator')

router.post('/record',

    //validation and sanitization
    body('title').not().isEmpty().trim().escape(),
    body('album').not().isEmpty().trim().escape(),
    body('year').isInt({min:1950, max:2030}).not().isEmpty().trim().escape(),

    async(req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

        const song = new Song(req.body)
        song.slug = req.body.title.replace(/\s+/g, '-').toLowerCase()

        try { 
            
            await song.save()  
            res.status(201).send({ song }) 
        }

        catch (e) { res.status(400).send(e) } 
    }
)

router.get('/songs', 

    async(req, res) => {
        
        try {

            const allSongs = await Song.find()
            res.status(201).send(allSongs)
        }

        catch (e) { res.status(400).send(e) } 
    }
)

router.get('/song/:title',

    param('title').not().isEmpty().trim().escape(),

    async(req, res) => {

        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }

            const songByTitle = await Song.findOne({slug: req.params.title})

            res.status(201).send(songByTitle)
        }
        
        catch (e) { res.status(400).send(e) } 
    }
)

module.exports = router
