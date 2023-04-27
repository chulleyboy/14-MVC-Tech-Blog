const router = require('express').Router();
const { User, Comment } = require('../../models');

const comments = await Comment.findAll({
	where: {
	  user_id: logged_in_user_id
	}
  });
