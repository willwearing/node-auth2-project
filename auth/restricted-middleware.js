const { jwtSecret } = require("./secrets.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "we wants token" });
  }

  // to verify the token, we need two things:
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "token bad" });
    }

    console.log("decoded token", decoded);
    req.decodedJwt = decoded;
    next();
  });
};
