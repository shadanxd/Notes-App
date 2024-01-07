const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const appConfig = require('../config/app-config');
const user = require('../model/user-model')

exports.register = async (req, res, next) => {
    const {username, password} = req.body

    const existing_user = await user.findOne({where: {username : username}})
    if (existing_user!=null){
      res.status(401).send({message: "Username Already Exists"});
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    req.body.password = hashedPassword
    //hashpassword and send it to create user
    next()
}

exports.login = async (req, res) =>{ 
    try {
    const { username, password } = req.body;

   // Find the user by username
   const existing_user = await user.findOne({where: {username : username}})

    // Check if the user exists
    if (!existing_user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, existing_user.password);

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
    const decoded = jwt.verify(token, appConfig.SECRET_KEY);
    req.session.user = decoded.username
    next()
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}
