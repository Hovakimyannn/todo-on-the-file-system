"use strict"

const express = require('express');
const listController = require('../Controllers/ListController.js');
const validationHandler = require('./middlewares/validator.js');
const {createTodoValidation, editTodoValidation} = require('./middlewares/Validations/todoValidation.js');
const router = express.Router();
const list = new listController();

router.get('/', list.get)
    .get('/:id', list.getById)
    .put('/:id', editTodoValidation, validationHandler, list.update)
    .delete('/:id', list.destroy)
    .post('/create', createTodoValidation, validationHandler, list.create)

module.exports = router;
