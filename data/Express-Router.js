const db = require('./db.js');

const router = require('express').Router();


//request handler functions
//create new post - WORKING
router.post('/', async (req, res) => {
  
      try {
            if(!req.body.title || !req.body.contents) {
                  res.status(400).json({ errorMessage: "So sorry, you must provide both the title AND contents." })
            } else {
                  const posts = await db.insert(req.body);
                  res.status(200).json(posts);
            }
      } catch (err) {
            res.status(500).json({ 
                  error: "There was an error while saving the post to the database" 
            });

      }
});

//create new comment for specific post
router.post('/:id/comments', async (req, res) => {
      try {
            const post_id = req.params.id;
            const text = req.body.text;
            const comment = { text, post_id }
            
            if (!post_id) {
                  res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else if (!text) {
                  res.status(400).json({ errorMessage: "Please provide text for the comment." });

            } else {
                  const commentId = await db.insertComment(comment);
                  res.status(201).json(commentId)
            }
      } catch (err) {
            res.status(500).json({ 
                  error: "There was an error while saving the comment to the database"
            })
      }
});

//find posts - WORKING
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

//find specific post by id - WORKING
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

//find comments for specific post - WORKING
router.get('/:id/comments', async (req, res) => {
      try {
            const id = req.params.id;
            if (!id) {
                  res.status(404).json({ message: "The post with the specified ID does not exist."});
            } else {
                 const comments = await db.findPostComments(req.params.id);
                 res.status(200).json(comments);  
            }
      } catch (err) {
            console.log(err)
            res.status(500).json({
                  error: "The comments information could not be retrieved" 
            })
      }
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