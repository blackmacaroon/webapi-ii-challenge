const db = require('./db.js');

const router = require('express').Router();


//request handler functions
//create new post 
router.post('/', async (req, res) => {
      try {
            const posts = await db.insert(req.query);
            if(!req.body.title || !req.body.contents) {
                  res.status(400).json({ errorMessage: "So sorry, you must provide both the title AND contents." })
            } else {
                  res.status(200).json(posts);
            }
      } catch (err) {
            res.status(500).json({ 
                  error: "There was an error while saving the post to the database" 
            });

      }
});

//create new post comment
router.post('/:id/comments', (req, res) => {

});

//find posts
router.get('/', async (req, res) => {
      try {
            const posts= await db.find(req.query);
            res.status(200).json(posts);
      } catch (err) {
            console.log(err);
            res.status(500).json({
                  message: "Error retrieving your posts",
            });
      }
});

//find specific post by id
router.get('/:id', async (req, res) => {
      try {
            const post = await db.findById(req.params.id);
            if (post) {
                  res.status(200).json(post);
            } else {
                  res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
      } catch (err) {
            console.log(err)
            res.status(500).json({
                  error: "The post information could not be retrieved." 
            })
      }

});

//find comments for specific post
router.get('/:id/comments', (req, res) => {

});

//delete specific post by id
router.delete('/:id', async (req, res) => {
      try {
            const count = await db.remove(req.params.id);
            if (count > 0) {
                  res.status(200).json({ success: 'The post has been removed' });
            } else {
                  res.status(404).json({ errorMessage: 'The post with the specified ID does not exist' });
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({
                  errorMessage: "The post could not be removed"
            })
      }
});

//edit specific post by id
router.put('/:id', async (req, res) => {
      try {
            const post = req.body;
            const id = req.params.id;
            if(!post.title || !post.contents) {
                  res.status(400).json({ errorMessage: "So sorry, you must provide both the title AND contents." })
            } else if (!id) {
                  res.status(404).json({ errorMessage: 'The post with the specified ID does not exist' });
                  
            }
            const updatedPost = await db.update(post, id);
            res.status(200).json(updatedPost);
      } catch (err) {
            console.log(err);
            res.status(500).json({
                  error: "The post information could not be modified." 
            })
      }
});


module.exports = router;