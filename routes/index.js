var express = require('express');
var router = express.Router();

/* Page Navigation*/

// Renders About Page
router.get('/about', (req, res) => {
  try {
      res.render('about', {title: "Downtown Donuts"});
  } catch (error) {
    console.error('Error Rendering Page:', error);
    res.status(500).send('Error Rendering Page');
  }
});

// Renders Menu Page
router.get('/menu', (req, res) => {
    try {
      res.render('menu', {title: "Downtown Donuts"});
  } catch (error) {
    console.error('Error Rendering Page:', error);
    res.status(500).send('Error Rendering Page');
  }
});

// Renders Review Page and results
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


// Renders Inital Page
router.get('/', function(req, res, next){
  try {
      res.render('index', {title: "Downtown Donuts"});
  } catch (error) {
    console.error('Error Rendering Page:', error);
    res.status(500).send('Error Rendering Page');
  }
});


// Leaves a comment based on form
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