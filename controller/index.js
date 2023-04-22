const router = require("express").Router();
const postRoutes = require('./api/post.js');
const userRoutes = require('./api/user.js');
const homeRoutes = require('./api/home.js');

router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);


module.exports = router;
