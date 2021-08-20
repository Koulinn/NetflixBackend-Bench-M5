import {body} from 'express-validator'

export const movieFieldsValidation = [
    body("Title").exists().withMessage("Title is mandatory").notEmpty().withMessage('Must not be empty'),
    body("Year").exists().withMessage("Content is mandatory"),
    body("Type").exists().withMessage("Category is mandatory"),
]