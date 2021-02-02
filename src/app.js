const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// initialize parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

module.exports = app;
