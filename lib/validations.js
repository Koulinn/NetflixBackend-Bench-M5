import {body} from 'express-validator'

export const movieFieldsValidation = [
    body("Title").exists().withMessage("Title is mandatory").notEmpty().withMessage('Must not be empty'),
    body("Year").exists().withMessage("Year is mandatory").notEmpty().withMessage('Must not be empty'),
    body("Type").exists().withMessage("Type is mandatory").notEmpty().withMessage('Must not be empty'),
]