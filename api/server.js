const express = require('express');

const expressRouter = require('../data/Express-Router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', expressRouter);

server.get('/', (req, res) => {
      res.send("it's working!!");
});

module.exports = server;