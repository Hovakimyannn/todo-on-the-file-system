'use strict'

const {body} = require("express-validator");

/**
 * @type {RequestHandler<RouteParameters<"/:id">, any, any, ParsedQs, Record<string, any>>}
 */
const createTodoValidation = [
    body("todo")
        .isString().withMessage('Status should be string')
        .isLength({min: 1, max: 1000})
        .withMessage("Todo should be at least 1 characters to the limit 1000"),

    body("status")
        .optional()
        .isBoolean()
        .withMessage("status should be boolean")
];

/**
 * @type {RequestHandler<RouteParameters<"/:id">, any, any, ParsedQs, Record<string, any>>}
 */
const editTodoValidation = [
    body("todo")
        .optional()
        .isString().withMessage('Status should be string')
        .isLength({min: 1, max: 1000})
        .withMessage("Todo should be at least 1 characters to the limit 1000"),

    body("status")
        .optional()
        .isBoolean()
        .withMessage("status should be boolean")
];

module.exports = {
    createTodoValidation,
    editTodoValidation
}
