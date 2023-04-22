const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User)

module.exports = { User, Comment};
