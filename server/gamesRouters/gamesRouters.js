const router = require('express').Router();

const games = require('../../data/gamesModel/gamesModel');

router.get('/', async (req, res) => {
    try {
       const data = await games.getAll();
       res.status(200).json(data);
    } catch (error) {
       res.status(500).json('server error'); 
    }
})

router.post('/', async (req, res) => {
    const {title, genre, releaseYear} = req.body;
    if(title && genre){
        try {
           const data = await games.add({
               title,
               genre,
               releaseYear
           });
           console.log(data)
           res.status(201).json(data);
        } catch (error) {
           res.status(500).json('server error') 
        }
    } else {
        res.status(422).json('incomplete data')
    }
})

module.exports = router