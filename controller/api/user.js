
const router = require('express').Router();
const { User } = require('../../models');

//login
router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: {
				username: req.body.username,
			}
		});
	
	if (!userData) {
		res
		.status(400)
		.json({message: 'Invalid username or password'})
		return;
	}

	const password = await userData.checkPassword(req.body.password);

	if (!password) {
		res
		.status(400)
		.json({message: 'Invalid username or password'})
		return;
	}

	req.session.save(() => {
	  req.session.loggedIn = true;
	  req.session.user_id = userData.id;
	  req.session.user_username = userData.username;
      res
        .status(200)
        .json({ user: userData, message: 'Successfully logged in!' });
    });
	} catch (err) {
		res.status(500).json(err);
	}
})

//logout
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

//Signup
router.post('/signup', async (req, res) => {
	try {
		const userData = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.user_id = userData.id;
			req.session.user_username = userData.username;
			res.status(200).json({ user: userData, message: 'Successfully signed up!' });
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
