const express = require("express");
const usersRouter = require("./users/users-router");
const { logger } = require("./middleware/middleware");

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here

server.use("/users", logger, usersRouter);

server.use("/", logger);

module.exports = server;
