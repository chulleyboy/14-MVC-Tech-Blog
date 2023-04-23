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
  .then((comment) => {
    const posts = comment.map((comment) => comment.get({ plain: true }));
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
  const user_id = req.session.user_id;
  res.render('dashboard', { loggedIn: true }, { user_id });
});

module.exports = router;
