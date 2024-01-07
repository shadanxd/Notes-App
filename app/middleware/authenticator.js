const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const appConfig = require('../config/app-config');

exports.register = (req, res, next) => {
    const {username, password} = req.body

    //check username existence

    const hashedPassword = bcrypt.hash(password, 10)
    req.body.password = hashedPassword
    //hashpassword and send it to create user
    next()
}

exports.login = (req, res) =>{ 
    try {
    const { username, password } = req.body;

   /* // Find the user by username
    const user = users.find(user => user.username === username);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = bcrypt.compare(password, user.password);*/

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, appConfig.SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } 
}

exports.authenticate = (req, res, next) => {
const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.session.user = decoded.username
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}
