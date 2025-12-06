var express = require('express');
var router = express.Router();

/* Page Navigation*/

router.get('/about', (req, res) => {
  try {
      res.render('about', {title: "Downtown Donuts"});
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/menu', (req, res) => {
    try {
      res.render('menu', {title: "Downtown Donuts"});
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/reviews', (req, res) => {
    try {
    req.db.query('SELECT * FROM comments;', (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).send('Error fetching comments');
      }
      res.render('reviews', { title: 'Downtown Donuts', comments: results });
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
});

/* GET home page. */

// Renders Inital
router.get('/', function(req, res, next){
  try {
      res.render('index', {title: "Downtown Donuts"});
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});


/* Leave a Comment */
router.post('/comment', function (req, res, next) {
  const { name } = req.body;
  const { comment } = req.body;
    try {
      req.db.query('INSERT INTO comments (commenterName, comment) VALUES (?, ?);', [name, comment], (err, results) => {
        if (err) {
          console.error('Error adding comment:', err);
          return res.status(500).send('Error adding comment');
        }
        console.log('Comment added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/reviews');
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Error adding comment');
    }
});

module.exports = router;