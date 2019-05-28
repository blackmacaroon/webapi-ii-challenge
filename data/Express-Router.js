const db = require('./db.js');

const router = require('express').Router();


//request handler functions

router.post('/', async (req, res) => {
      if(!req.body.title || !req.body.contents) {
            res.status(400).json({ error: "So sorry, you must have both a title AND contents." })
      } //400 = bad request
      db
            .insert()
            .then(post => {
                  res.status(201).json(post);
            }) //201 = created
            .catch(err => {
                  res.status(500).json({ err: 'Could not create new post' })
            })
});

//
router.post('/:id/comments', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/comments', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});


module.exports = router;