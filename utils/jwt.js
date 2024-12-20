const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
};


const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; 
  }
};

module.exports = { generateToken, verifyToken };
