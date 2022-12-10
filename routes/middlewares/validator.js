'use strict'

const {validationResult} = require("express-validator");

module.exports = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(409).json({
            err: "invalid Data Passed!",
            errors: errors
        })
    }

    return next();
}
