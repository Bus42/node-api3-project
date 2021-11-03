const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const usersModel = require("./users-model");
// const postsModel = require('../posts/posts-model');
// The middleware functions also need to be required
const middleware = require("../middleware/middleware");

const { validateUserId } = middleware;

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
  const userID = req.params.id;
  usersModel
    .getById(userID)
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

// router.post('/', (req, res) => {
//   // RETURN THE NEWLY CREATED USER OBJECT
//   // this needs a middleware to check that the request body is valid
// });

// router.put('/:id', (req, res) => {
//   // RETURN THE FRESHLY UPDATED USER OBJECT
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

// router.delete('/:id', (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // this needs a middleware to verify user id
// });

// router.get('/:id/posts', (req, res) => {
//   // RETURN THE ARRAY OF USER POSTS
//   // this needs a middleware to verify user id
// });

// router.post('/:id/posts', (req, res) => {
//   // RETURN THE NEWLY CREATED USER POST
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

// do not forget to export the router
module.exports = router;
