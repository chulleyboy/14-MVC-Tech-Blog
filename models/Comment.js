const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}


Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		  },
		  title: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  content: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			}
		  },
		  username: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'user',
				key: 'username',
			}
		  },
		  date: {
			type: DataTypes.STRING,
			allowNull: false,
		  }
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'comment',
	  }
)

module.exports = Comment;
