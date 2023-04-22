const router = require('express').Router();
const { User, Comment } = require('../../models');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  PostComment.findALL({
	attributes: ["id", "content", "title"],
	includes: [
		{
			model: User,
			attributes: ["username"]
		}
	]
  })
  .then((dbPostData) => {
	const posts = dbPostData.map((post) => post.get({ plain: true }));
	res.render("homepage", { posts, loggedIn: req.session/loggedIn });
  })
  .catch((err) => {
	console.log(err);
	res.status(500).json(err);
  });
});

// logun route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
