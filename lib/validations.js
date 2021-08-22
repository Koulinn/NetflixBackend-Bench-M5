import {body} from 'express-validator'

export const movieFieldsValidation = [
    body("Title").exists().withMessage("Title is mandatory").notEmpty().withMessage('Must not be empty'),
    body("Year").exists().withMessage("Year is mandatory").notEmpty().withMessage('Must not be empty'),
    body("Type").exists().withMessage("Type is mandatory").notEmpty().withMessage('Must not be empty'),
]

export const commentValidation = [
    body("comment").exists().withMessage("The field comment is mandatory").notEmpty().withMessage('Must not be empty'),
    body("ratting").exists().withMessage("The field ratting is mandatory").isNumeric().withMessage('Must be type Number').notEmpty().withMessage('Must not be empty'),
]