const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
//import generateToken from '../utilities/getToken.js';

async function signup(request, response) {
  try {
    const {
      name,
      email,
      number1,
      number2,
      building,
      street,
      city,
      country,
      logo,
      password,
    } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({
      name,
      email,
      number1,
      number2,
      building,
      street,
      city,
      country,
      logo,
      password: hashedPassword,
    });
    response.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
}

async function login(request, response) {
  try {
    //gets user email nd password from login details
    const { email, password } = request.body;
    //searches database for email
    const user = await User.findOne({ email });
    //if email not found returns
    if (!user) return response.sendStatus(401);
    // if email found, checks if password matches
    const passwordMatch = bcrypt.compareSync(password, user.password);
    //if does not match
    if (!passwordMatch) return response.sendStatus(401);
    //create jwt
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
    console.log('tok', token);
    //response
    //set cookie
    response.cookie('Authorization', token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: 'lax',
      //if set to true will only work on secure sites, this lets it work on the local host when we are developing
      secure: process.env.NODE_ENV === 'production',
    });
    response.sendStatus(200);
    console.log('hi', response);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
}
function logout(request, response) {
  try {
    response.clearCookie('Authorization');
    response.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400).json({ error: 'Failed' });
  }
}

function checkAuth(request, response) {
  try {
    response.sendStatus(200);
    console.log(request.user);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
