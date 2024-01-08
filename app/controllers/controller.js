const UserModel = require('../model/user-model')
const NoteModel = require('../model/notes-model');

exports.signup = (req, res) => {
    UserModel.create({
        username : req.body.username,
        password: req.body.password,
        name: req.body.name
    })
    .then((user) => {
        console.log('User created:', user.toJSON());
        res.status(200).send({
            message: "user created"
        })
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        res.status(500).send({
            message: "Server Error"
        })
      });
}

exports.addNewNote = (req, res) => {
    NoteModel.create({
        user_id: req.session.user_id,
        title: req.body.title,
        content: req.body.content
    })
    .then((note) => {
        console.log('User created:', note.toJSON());
        res.status(200).send({
            message: "note added"
        })
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        res.status(500).send({
            message: "Server Error"
        })
      });
}

exports.findAll = async (req, res) => {
    try {
      const notes = await NoteModel.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['title', 'content'],
      });
  
      if (!notes || notes.length == 0) {
        res.status(400).send({ message: 'No notes found' });
        return;
      }
  
      // Use map to convert each Sequelize instance to JSON
      const notesJSON = notes.map((note) => note.toJSON());
  
      res.status(200).send(notesJSON);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  exports.findOne = async (req, res) => {
    try {
      const notes = await NoteModel.findOne({
        where: { user_id: req.session.user_id, note_id: req.params.id },
        attributes: ['title', 'content'],
      });
  
      if (!notes) {
        res.status(400).send({ message: 'No notes found' });
        return;
      }
      res.status(200).send(notes);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };
  
  exports.deleteNote = async (req, res) => {
    try {
      const notes = await NoteModel.destroy({
        where: { user_id: req.session.user_id, note_id: req.params.id }
      });
  
      if (!notes) {
        res.status(400).send({ message: 'No notes found' });
        return;
      }
      res.status(200).send({message: "Deleted"});
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  exports.updateNote = async (req, res) => {
    try {
      const notes = await NoteModel.update({
        content: req.body.content,
        title: req.body.title
      }, {
        where: { user_id: req.session.user_id, note_id: req.params.id },
        individualHooks: true
      });
  
      if (notes[0]==0) {
        res.status(400).send({ message: 'No notes found' });
        return;
      }
      res.status(200).send({message: "note updated"});
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  exports.searchNote = async (req, res) => {
    try{
        const notes = await NoteModel.searchKeyword(req.session.user_id, req.query.keyword)
        if (!notes || notes.length == 0) {
            res.status(400).send({ message: 'No notes found' });
            return;
          }
      
          res.status(200).send(notes);
          return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
  }