const express = require('express');

const router = require('../data/db.js');

const server = express();

server.use(express.json());






module.exports = server;