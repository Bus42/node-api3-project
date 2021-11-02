function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`request from ${req.get("host")} to /users${req.url}`);
  res.status(202);
  next();
}

// function validateUserId(req, res, next) {
//   // DO YOUR MAGIC
//   next();
// }

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
  // validateUserId,
  // validateUser,
  // validatePost,
};
