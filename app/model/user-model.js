const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Import the configured Sequelize instance

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  tableName: 'users',
  indexes: [
    {
      unique: true,
      fields: ['username']
    }
  ]
});

module.exports = User;
