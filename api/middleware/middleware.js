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
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

// function validateUser(req, res, next) {
//   // DO YOUR MAGIC
//   next();
// }

// function validatePost(req, res, next) {
//   // DO YOUR MAGIC
//   next();
// }

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  // validateUser,
  // validatePost,
};
