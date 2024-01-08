const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Import the configured Sequelize instance
const User = require('./user-model')

const Note = sequelize.define('Note', {
    note_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    content_vector: {
      type: DataTypes.TEXT, // Use TEXT type for tsvector
    },
  },
  );
  
  Note.belongsTo(User, { foreignKey: 'user_id' });

  // Custom function to generate tsvector
  const generateTsVector = (content) => {
    // Use PostgreSQL to_tsvector function for better handling
    return sequelize.literal(`to_tsvector('english', '${content}')`);
  };
  
  // Define a hook to update the content_vector before saving a note
  Note.beforeSave(async (note) => {
    // Perform your custom logic to update content_vector here
    note.content_vector = generateTsVector(note.content);
  });
  
  // Custom method to perform a full-text search using raw SQL query
  Note.searchByKeyword = async (keyword) => {
    const query = `
      SELECT *
      FROM "Notes"
      WHERE "content_vector" @@ to_tsquery('english', :keyword)
    `;
  
    return sequelize.query(query, {
      replacements: { keyword },
      type: sequelize.QueryTypes.SELECT,
    });
  };
  
  module.exports = Note;