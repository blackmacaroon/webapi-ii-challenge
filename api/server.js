const express = require('express');

const expressRouter = require('../data/Express-Router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', expressRouter);

module.exports = server;