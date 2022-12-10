'use strict'

const express = require('express');
const todo = require('./routes/todo.js');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/list', todo);

const port = 3000;
app.listen(port, () => console.log(`App running on port ${port}`));
