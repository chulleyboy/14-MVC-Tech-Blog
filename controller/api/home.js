const router = require('express').Router();
const { User, Comment } = require('../../models');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  Comment.findAll({
    attributes: ["id", "content", "title", "username", "date"],
    include: [{
      model: User,
      attributes: ["username"]
    }]
  })
  .then((commentData) => {
    const posts = commentData.map((comment) => comment.get({ plain: true }));
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// signup route
router.get('/signup', (req, res) => {
  res.render('signup', { loggedIn: req.session.loggedIn });
});

// dashboard route
router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  Comment.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ["id", "content", "title", "username", "date"],
    include: [{
      model: User,
      attributes: ["username"]
    }]
  })
  .then((commentData) => {
    const posts = commentData.map((comment) => comment.get({ plain: true }));
	const temp = {
		user_id: req.session.user_id,
		user_username: req.session.user_username,
	  }
	res.render('dashboard', {temp, loggedIn: true, posts});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
