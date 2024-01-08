const UserModel = require('../model/user-model')
const NoteModel = require('../model/notes-model')

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