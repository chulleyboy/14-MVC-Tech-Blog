const router = require('express').Router();
const { User, Comment } = require('../../models');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  Comment.findAll ({
	attributes: ["id", "content", "title"],
	includes: [
		{
			model: User,
			attributes: ["username"]
		}
	]
  })
  .then((commentData) => {
	const posts = dbPostData.map((commentData) => post.get({ plain: true }));
	res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  })
  .catch((err) => {
	console.log(err);
	res.status(500).json(err);
  });
});

// logun route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
