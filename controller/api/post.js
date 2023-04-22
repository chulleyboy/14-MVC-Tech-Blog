const router = require("express").Router();
const { Comment } = require("../../models");

// create comment
router.post("/", async (req, res) => {
	try {
		const comment = await Comment.create({
			title: req.body.title,
			content: req.body.content,
		});

		req.session.save(() => {
			req.session.loggedIn = true;
			res.status(200).json(comment);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get("/", async (req, res) => {
	try {
		const comment = await Comment.findAll();
		const data = comment.map((comment) =>
		data.get({ plain: true })
		);
		res.render("homepage", {
			comment,
			loggedIn: req.session.loggedIn
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
