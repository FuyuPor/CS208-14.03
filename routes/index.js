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
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('index', { title: 'My Simple TODO', todos: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

// Creates Task
router.post('/create', function (req, res, next) {
    const { task } = req.body;
    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [task], (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        console.log('Todo added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).send('Error adding todo');
    }
});

// Deletes Task
router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        console.log('Todo deleted successfully:', results);
        // Redirect to the home page after deletion
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Error deleting todo:');
    }
});

// Edits a task
router.post('/edit', function (req, res, next) {
    const { id } = req.body;
    const { editor } = req.body;
    try {
      // edit task description 
      req.db.query('UPDATE todos SET task = ? WHERE id = ?;', [editor, id], (err, results) => {

        if (err) {
          console.error('Error editing todo:', err);
          return res.status(500).send('Error adding todo');
        }
        console.log('Todo edited successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/');
      });

    } catch (error) {
      console.error('Error editing todo:', error);
      res.status(500).send('Error editing todo');
      
    }
});

// Switches the value of "complete" when the "complete" button is pressed
router.post('/complete', function (req, res, next) {
    const { id } = req.body;
    try {
      // edit task description 
      req.db.query('UPDATE todos SET completed = NOT completed WHERE id = ?;', [id], (err, results) => {

        if (err) {
          console.error('Error completing task:', err);
          return res.status(500).send('Error completing task');
        }
        console.log('Todo completed successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/');
      });

    } catch (error) {
      console.error('Error completing task:', error);
      res.status(500).send('Error completing task');
      
    }
});


/* Leave a Comment */
router.post('/comment', function (req, res, next) {
  const { name } = req.body;
  const { comment } = req.body;
    try {
      req.db.query('INSERT INTO comments (commenterName, comment) VALUES (?);', [name, comment], (err, results) => {
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