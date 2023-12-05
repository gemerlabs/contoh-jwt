const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    jwt.verify(
      authorization?.slice(7),
      "c62cf112a122157cfe55d492f5a12296b9c90065"
    );
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Not authorized!",
    });
  }
};

module.exports = authMiddleware;
