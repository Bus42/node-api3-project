const usersModel = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `request from ${req.get("host")} to ${
      req.url
    } at ${new Date().toISOString()}`
  );
  res.status(202);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const userId = req.params.id;
  usersModel
    .getById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "user not found" });
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const userName = req.body.name;
  if (!userName) {
    res.status(400).send({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const postText = req.body.text;
  if (!postText) {
    res.status(400).send({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
