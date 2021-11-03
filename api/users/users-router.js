const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const usersModel = require("./users-model");
const postsModel = require("../posts/posts-model");
// The middleware functions also need to be required
const middleware = require("../middleware/middleware");

const { validateUserId, validateUser } = middleware;

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  usersModel
    .get()
    .then((response) =>
      response
        ? res.status(200).send(response)
        : res.status(500).send({ message: "could not fetch users" })
    )
    .catch((err) => res.status(500).send({ message: err }));
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const userId = req.params.id;
  usersModel
    .getById(userId)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

router.post("/", validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  usersModel
    .insert(req.body)
    .then((newUser) => res.status(200).send(newUser))
    .catch((err) => res.status(500).send({ message: err }));
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const userId = req.params.id;
  usersModel
    .update(userId, req.body)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: err }));
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const userId = req.params.id;
  let user = {};
  usersModel.getById(userId).then((doomedUser) => {
    user = doomedUser;
  });
  usersModel.remove(userId).then(() => res.send(user));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const userId = req.params.id;
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  postsModel
    .getById(userId)
    .then((posts) => res.status(200).send(posts))
    .catch((err) => res.status(500).send({ message: err }));
});

// router.post('/:id/posts', (req, res) => {
//   // RETURN THE NEWLY CREATED USER POST
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

// do not forget to export the router
module.exports = router;
