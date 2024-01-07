const UserModel = require('../model/user-model')

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